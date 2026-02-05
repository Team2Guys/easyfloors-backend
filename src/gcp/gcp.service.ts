import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuthService } from './services/google-auth.service';
import { timeStamp } from 'console';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';

@Injectable()
export class GoogleMerchantService {
  constructor(
    private readonly authService: GoogleAuthService,

    private prisma: PrismaService,
  ) {}

  private readonly PRODUCT_URL =
    'https://rfrichmond.com/available-products.json';

  async uploadProducts(merchantId: string) {
    const authClient = await this.authService.setStoredCredentials();
    const content = google.content({ version: 'v2.1', auth: authClient });

    const products = await this.prisma.products.findMany({
      include: { category: true, subcategory: true },
    });
    if (!products || products.length === 0) return 'No products found';

    const responses: any = [];

    for (const product of products) {
      let url = 'https://easyfloors.ae/';

      if (product.subcategory) {
        url += `${product.category?.RecallUrl}/${product.subcategory.custom_url}/${product.custom_url}`;
      } else {
        url += `${product.category?.RecallUrl}/${product.custom_url}`;
      }
      try {
        const res = await content.products.insert({
          merchantId,
          requestBody: {
            offerId: product.id.toString(),
            title: product.name,
            description: product.description,
            link: url,
            // @ts-ignore
            imageLink: product?.posterImageUrl?.imageUrl as any,
            contentLanguage: 'en',
            targetCountry: 'AE',
            channel: 'online',
            availability: product.stock > 0 ? 'in stock' : 'out of stock',
            condition: 'new',
            price: {
              value: product.price.toString(),
              currency: 'AED',
            },
          },
        });

        responses.push({ productId: product.id, result: res.data });
      } catch (error) {
        console.error(`Error uploading product ${product.id}:`, error.message);
        responses.push({ productId: product.id, error: error.message });
      }
    }

    return responses;
  }

  async UpdateStock() {
    try {
      const response = await fetch(this.PRODUCT_URL, {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
        },
      });

      const text = await response.text();
      const jsonPart = text.split(/\r?\n\r?\n/).pop(); // remove HTTP headers
      const data = JSON.parse(jsonPart!);
      let updatedAt = new Date();

      if (!(data?.Products?.length > 0))
        return customHttpException('Products not found');

      for (const item of data.Products) {
        const sku = item.SKU?.trim();
        const stock = Number(item.AvailableStock ?? 0);

        if (!sku) continue;

        // First try to find in products
        const product = await this.prisma.products.findFirst({
          where: { sku },
        });
        let updatedAt = new Date();

        console.log(item?.name, 'product', product?.sku, stock);
        if (product) {
          await this.prisma.products.updateMany({
            where: { sku },
            data: { stock, stockUpdateDate: updatedAt },
          });
          continue;
        }

        const accessory = await this.prisma.acessories.findFirst({
          where: { sku },
        });

        if (accessory) {
          await this.prisma.acessories.updateMany({
            where: { sku },
            data: { stock },
          });
          continue;
        }
      }
      return data.Products;
    } catch (error) {
      throw customHttpException('Failed to update stock');
    }
  }
}
