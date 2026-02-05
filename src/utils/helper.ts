import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateAppointmentInput } from '../appointments/dto/create-appointment.input';
import nodemailer from 'nodemailer';
import {
  contactUsEmailInput,
  orderEmailInput,
} from '../sales-products/dto/create-sales-product.input';

export const customHttpException = (error: any, status?: string) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Unique constraint violation
        throw new HttpException(
          'A record with this value already exists.',
          HttpStatus.BAD_REQUEST,
        );
      case 'P2025': // Record not found
        throw new HttpException(
          'The requested record does not exist.',
          HttpStatus.NOT_FOUND,
        );
      default:
        throw new HttpException(
          'A database error occurred.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
  throw new HttpException(
    error || 'An unexpected error occurred.',
    status ? HttpStatus[status] : HttpStatus.INTERNAL_SERVER_ERROR,
  );
};

const transporter = nodemailer.createTransport({
  host: 'mail.blindsandcurtains.ae',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendAppointmentEmail = async (
  appointmentData: CreateAppointmentInput,
) => {
  const {
    firstname,
    email,
    phoneNumber,
    whatsappNumber,
    area,
    selectRooms,
    preferredDate,
    preferredTime,
    findUs,
    comment,
    contactMethod,
    AppointsType,
  } = appointmentData;

  const htmlTemplate = ` <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 5px;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #bc6838;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: white;
          }
          .field {
            margin: 15px 0;
          }
          .label {
            font-weight: bold;
            
          }
          .footer {
            text-align: center;
            color: #777;
            font-size: 12px;
            padding: 10px;
            border-top: 1px solid #eee;
          }
          .highlight {
            background-color: #f0f8ff;
            padding: 10px;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Appointment Confirmation</h2>
          </div>
          <div class="content">
            <p>Dear ${firstname},</p>
            <p>Thank you for scheduling an appointment with us! Here are the details:</p>

            <div class="field">
              <span class="label">Appointment Type:</span> 
              ${AppointsType ? AppointsType.toUpperCase() : 'Not specified'}
            </div>

            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>

            <div class="field">
              <span class="label">Phone Number:</span> ${phoneNumber}
            </div>

            ${
              whatsappNumber
                ? `
              <div class="field">
                <span class="label">WhatsApp Number:</span> ${whatsappNumber}
              </div>
            `
                : ''
            }

            ${
              area
                ? `
              <div class="field">
                <span class="label">Area:</span> ${area}
              </div>
            `
                : ''
            }

            ${
              selectRooms
                ? `
              <div class="field">
                <span class="label">Approximate Area :</span> ${selectRooms}
              </div>
            `
                : ''
            }

            <div class="field highlight">
              <span class="label">Preferred Date:</span> 
              ${preferredDate ? new Date(preferredDate).toLocaleDateString() : 'Not specified'}
            </div>

            <div class="field highlight">
              <span class="label">Preferred Time:</span> 
              ${preferredTime || 'Not specified'}
            </div>

            ${
              findUs
                ? `
              <div class="field">
                <span class="label">How You Found Us:</span> ${findUs}
              </div>
            `
                : ''
            }

            ${
              comment
                ? `
              <div class="field">
                <span class="label">Comments:</span>
                <p>${comment}</p>
              </div>
            `
                : ''
            }

            ${
              contactMethod
                ? `
              <div class="field">
                <span class="label">Preferred Contact Method:</span>
                ${
                  [
                    contactMethod.whatsapp && 'WhatsApp',
                    contactMethod.telephone && 'Call',
                    contactMethod.email && 'Email'
                  ].filter(Boolean).join(', ')
                }
              </div>
                `
                : ''
            }

<div class='text-center'>Measurement appointment will be charged at <strong>AED 150</strong> for Dubai and other emirates <strong>AED 250</strong>, which is fully <strong>REFUNDABLE</strong> if you place an order with us.</div>

<p>We will contact you soon to confirm your appointment. If you need to make any changes, please reply to this email or call us at <a href="tel:+971505974385" target="_blank" >+971 50 597 4385</a>.</p>
          
            </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Easyfloors. All rights reserved.</p>
            <p>This is an automated message. Please do not reply directly to this email unless instructed.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  console.log(AppointsType, 'AppointsType');
  try {
    await transporter.sendMail({
      from: `${AppointsType == 'appointments' ? 'Measurement Appointment' : 'Installation Appointments'} ${process.env.EMAIL_USER}`,
      to: `${email}`,
      subject: `Appointment Request Confirmation - ${AppointsType || 'General'}`,
      html: htmlTemplate,
    });
    await transporter.sendMail({
      from: `${AppointsType == 'appointments' ? 'Measurement Appointment' : 'Installation Appointments'} ${process.env.EMAIL_USER}`,
      to: `${process.env.EMAIL_USER},${process.env.ORDER_MAIL1},${process.env.ORDER_MAIL2},${process.env.ORDER_MAIL3}`,
      subject: `Appointment Request Confirmation - ${AppointsType || 'General'}`,
      html: htmlTemplate,
    });
  } catch (error) {
    console.error('Error sending appointment email:', error);
    throw new Error('Failed to send appointment confirmation email');
  }
};

export const contactusEmail = async (data: contactUsEmailInput) => {
  const { firstName, LastName, email, phoneNumber, message } = data;

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 5px;
          }
          .header {
            background-color: #bc6838;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
          }
          .field {
            margin: 10px 0;
          }
          .label {
            font-weight: bold;
            color: #333;
          }
          .footer {
            text-align: center;
            color: #777;
            font-size: 12px;
            padding: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Us Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">First Name:</span> ${firstName}
            </div>
            <div class="field">
              <span class="label">Last Name:</span> ${LastName}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            <div class="field">
              <span class="label">Phone Number:</span> ${phoneNumber}
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <p>${message}</p>
            </div>
          </div>
          <div class="footer">
            This message was sent from your website's contact form
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: `${process.env.CONTACT_US_EMAIL},${process.env.ORDER_MAIL3}`,
    subject: `New Contact Form Submission from ${firstName} ${LastName}`,
    html: htmlTemplate,
  });
};

function formatedDate(date: Date): string {
      return date.toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   }


export const sendEmailHandler = async (
  orderDetails: orderEmailInput,
  CustomerEmail?: string,
  orderStatus?: string,
) => {
  const {
    products,
    firstName,
    lastName,
    orderId,
    email,
    phone,
    address,
    emirate,
    totalPrice,
    shipmentFee,
  } = orderDetails;

  const formattedDate = new Date()
    .toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    .toUpperCase();

  function formatedDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  const orderDate = new Date(
    orderDetails?.transactionDate ||
      (orderDetails as any)?.checkoutDate ||
      Date.now(),
  );

  function trackingOrder(
    shippingMethod: 'Standard Shipping' | 'Express Shipping' | 'Self Collect',
    orderTime: Date,
  ): string {
    const orderHour = orderTime.getHours();
    const currentDate = new Date(orderTime);

    if (shippingMethod === 'Express Shipping') {
      // Deliver next day if before 1 PM, otherwise 2 days later
      currentDate.setDate(currentDate.getDate() + (orderHour < 13 ? 1 : 2));
      return formatedDate(currentDate);
    } else if (shippingMethod === 'Standard Shipping') {
      // Add about 3 business days, skipping weekends
      let addedDays = 0;
      while (addedDays < 3) {
        currentDate.setDate(currentDate.getDate() + 1);
        const day = currentDate.getDay();
        if (day !== 0 && day !== 6) addedDays++;
      }
      return formatedDate(currentDate);
    } else {
      // Self Collect → ready in 2 days
      currentDate.setDate(currentDate.getDate() + 2);
      return formatedDate(currentDate);
    }
  }

  const emailTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>${orderStatus === 'delivered' || orderStatus === 'shipped' ? (orderStatus === 'shipped' ? 'Your EasyFloor Order Is On Its Way!' : 'Your EasyFloor Order Has Arrived!') : orderDetails.isfreesample ? 'Free Sample Order Confirmation' : 'Order Confirmation'}</title>
 <style>
    body {
       font-family: Arial, sans-serif;
       margin: 0;
       padding: 0;
       background-color: #f4f4f4;
    }

    .container {
       max-width: 600px;
       margin: 20px auto;
       background-color: #fff;
       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       border-top: 5px solid #BF6933;
       border-bottom: 5px solid #BF6933;
    }

    .main-container {
       padding: 20px;
       background-color:rgb(255, 255, 255) !important;
    }

    .header {
       text-align: center;
       padding: 20px 0;
    }

    .header img {
       max-width: 250px;
    }

    .status {
       display: flex;
       justify-content: center;
       align-items: center;
       margin: 20px 0;
    }

    .status div {
       padding: 10px 20px;
       border-radius: 20px;
       margin: 0 5px;
       display: flex;
       align-items: center;
       justify-content: center;
       width: 120px;
       font-weight: bold;
    }

    .confirmed {
       background-color: #BF6933;
       color: #fff;
    }

    .shipping,
    .received {
       background-color: #ddd;
       color: #333;
    }

    .order-button {
       display: block;
       width: 200px;
       text-align: center;
       background-color: #BF6933;
       color: white !important;
       padding: 10px;
       margin: 20px auto;
       text-decoration: none;
       border-radius: 1px;
    }

    .table-font{
       font-size: 13px;
       color: black;
    }
      
    .order-para{
      color: black;
    }
    
    .purchase-details {
       background-color: #FFF9F5;
       padding: 15px;
       margin-top: 20px;
    }

    .purchase-table {
       width: 100%;
       border-collapse: collapse;
       text-align: center;
    }

    .purchase-table th,
    .purchase-table td {
       padding: 10px;
       text-align: left;
       border-bottom: 1px solid #ddd;
    }

    .footer {
       background-color: #BF6933;
       color: white;
       text-align: center;
       padding: 15px 0;
       margin-top: 20px;
    }

    .social-icons {
       text-align: center;
       margin-top: 10px;
    }

    .social-icons a {
       margin: 0 10px;
       text-decoration: none;
       font-size: 18px;
       color: #333;
    }

    .features {
       background-color: #ff6600;
       color: white;
       padding: 20px;
       display: flex;
       justify-content: space-around;
    }

    .feature {
       text-align: center;
    }

    .feature img {
       width: 40px;
       height: 40px;
    }

    .social-icons {
       padding: 15px;
    }

    .social-icons a {
       margin: 0 10px;
       text-decoration: none;
       font-size: 20px;
       color: black;
    }

    .features {
       background-color: #ff6600;
       color: white;
       width: 100%;
       align-items: center;
       padding: 30px;
    }

    .feature {
       text-align: center;
    }

    .feature img {
       width: 30px;
       height: auto;
    }

    .categories {
       margin-top: 5px;
       padding: 15px 0px;
       border-top: 2px solid #ccc;
       border-bottom: 2px solid #ccc;
       text-align: center;
    }

    .categories a {
       font-size: 11px;
       font-weight: 100;
       margin-top: 5px;
       text-decoration: none;
       color: rgb(255, 255, 255);
       padding: 10px 15px;
       background-color: #BF6933;
       display: inline-block;
    }

    .social-icons {
       padding: 15px;
    }

    .social-icons a {
       margin: 0 10px;
       text-decoration: none;
       font-size: 20px;
       color: black;
    }

    .progress-container {
       align-items: center;
       justify-content: center;
       margin-top: 50px;
       margin-bottom: 50px;
       width: 100%;
    }

    .step {
       display: flex;
       flex-direction: column;
       align-items: center;
       position: relative;
    }

    .step:not(:last-child)::after {
       content: "";
       position: absolute;
       width: 80px;
       height: 2px;
       background-color: black;
       top: 25px;
       left: 100%;
       transform: translateX(-40%);
    }

    .icon {
       width: 50px;
       height: 50px;
       border-radius: 50%;
       display: flex;
       align-items: center;
       justify-content: center;
       background-color: white;
       border: 2px solid black;
       font-size: 24px;
    }

    .completed .icon {
       background-color: #ff6600;
       color: white;
       border: none;
    }

    .step p {
       margin-top: 8px;
       font-size: 14px;
       font-weight: bold;
    }

@media (max-width: 450px) {
       .main-container{
          padding: 20px 5px;
       }
       .purchase-details{
          padding: 15px 5px;
       }
       .table-font.user-info{
          padding: 0px !important;
       }
       .user-info-wrapper{
          padding-right: 5px !important;
       }
       .total-wrapper{
          padding-right: 5px !important;
          padding-left: 5px !important;
       }
    }
    @media (max-width: 400px) {
       .table-font{
          font-size: 11px;
       }
       .purchase-details{
          padding: 15px 5px;
       }
    }
    @media (max-width: 350px) {
       .main-container{
          padding: 20px 5px;
       }
       .purchase-details{
          padding: 15px 5px;
       }
       .table-font{
          font-size: 10px;
       }
       .product-title-wrapper{
          width: 170px !important;
       }
       .product-title-wrapper .table-font {
          margin-left: 0px !important;
       }
       .purchase-details h3 {
          font-size: 16px !important;
       }
       .order-para {
          font-size: 14px !important;
       }
        .product-title-wrapper .product-img {
          width: 60px !important;
          height: 60px !important;
       }
      .categories a {
       padding: 10px;
      }
    }
 </style>
</head>

<body>
 <div class="container">
    <div class="main-container">
       <div class="header" style="text-align:center;">
          <img
             src="https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742982252/easyfloor_logo_2_goghap.jpg"
             alt="Brand Logo">
       </div>
       <h3 style="text-align:center; margin:0; padding:0; color: black;">ORDER#${orderId}</h3>
       <p style="text-align:center;margin:0;padding:0; color: black;">${formattedDate}</p>
       
       ${
         orderStatus === 'delivered'
           ? `
     <h1 style="text-align:center; color: black;">${orderDetails.isfreesample ? 'Free Sample Goods Received' : 'Goods Received'}</h1>
       <div class="progress-container" style="text-align:center;">
          <img src="https://res.cloudinary.com/dmmeqgdhv/image/upload/v1762113137/Easyfloor_shipment_3_cau5qc.jpg"
             alt="Progress Status" style="width: 100%;">
       </div>
       <p class="order-para" style="text-align:center;">Dear <b>${firstName} ${lastName},</b></p>
       <p class="order-para" style="text-align:center;">I’m delighted that you have received your order and would love to hear your thoughts. If everything went great, it would be so helpful if you could leave a nice review for us at <a href="https://g.page/r/CYR9R3Rk3eRjEBM/review"><b>Google</b></a></p>
       <p class="order-para" style="text-align:center;">In case there was any areas of the process that fell short of your expectations, I can only apologise for this and I would be very grateful if you could contact me directly on <a href="mailto:cs@easyfloors.ae"><b>cs@easyfloors.ae</b></a></p>
       <p class="order-para" style="text-align:center;">We at <a href="https://easyfloors.ae/"><b>easyfloors.ae</b></a>, appreciate that we’re not the only supplier in Dubai and giving a 5-star experience to our customers is our minimum goal, so all feedback would be taken seriously and any improvements would be implemented right away.</p>
       <p class="order-para" style="text-align:center;">Once again, a personal thank you for your faith in our company and I look forward to serving you again in the future.</p>
       <p class="order-para" style="text-align:center;">Best regards</p>
       <p class="order-para" style="text-align:center;">Shiraz</p>
       <p class="order-para" style="text-align:center;">Owner, <a href="https://easyfloors.ae/"><b>https://easyfloors.ae/</b></a></p>

       
       `
           : orderStatus === 'shipped'
             ? `
       <h1 style="text-align:center; color: black;">${orderDetails.isfreesample ? 'Free Sample Goods Are Ready to Ship' : 'Goods Are Ready to Ship'}</h1>

       <div class="progress-container" style="text-align:center;">
          <img src="https://res.cloudinary.com/dmmeqgdhv/image/upload/v1762113100/Easyfloor_shipment_2_pwkbir.jpg "
             alt="Progress Status" style="width: 100%;">
       </div>
        <p class="order-para" style="text-align:center;">Dear <b>${firstName} ${lastName},</b></p>
        <p class="order-para" style="text-align:center;">You’re only steps away from receiving your new order!</p>
        <p class="order-para" style="text-align:center;">As discussed with our dispatch team, your order is scheduled to arrive by the morning of <b>${orderDetails.deliveryDate ? formatedDate(orderDetails.deliveryDate) : trackingOrder(orderDetails.shippingMethod.name, orderDate)}</b></p>
        <p class="order-para" style="text-align:center;">We know how exciting it can be to receive new packages, and we hope your item/s live up to or even exceed your expectations.</p>
        <p class="order-para" style="text-align:center;">If there is any change required for the delivery, please get in touch with us as soon as possible.</p>
        <p class="order-para" style="text-align:center;">In the meantime, sit back and relax and we’ll see you soon!</p>
       <p class="order-para" style="text-align:center;">All The Best</p>
       `
             : `
       <h1 style="text-align:center; color: black;">${orderDetails.isfreesample ? 'Free Sample Order Confirmation' : 'Order Confirmation'}</h1>

       <div class="progress-container" style="text-align:center;">
          <img src="https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742982267/easyfloor_order_bhi6l1.jpg"
             alt="Progress Status" style="width: 100%;">
       </div>
       <p style="text-align:center;" class="order-para">Dear <b>Customer,</b></p>
       <p style="text-align:center;" class="order-para">Thank you very much for the order <br> you placed with <a
             href="https://easyfloors.ae/"><b>https://easyfloors.ae/</b></a></p>
       <a href="https://easyfloors.ae/track-order/${orderDetails.orderId}" class="order-button"> ${orderDetails.isfreesample ? " View Your Free Sample Order" : "View Your Order"}</a>
       <p style="text-align:center;" class="order-para">Your ${orderDetails.isfreesample ? "Free Sample order" : "order"} has now been sent to the warehouse to prepare for packing and
          dispatch.</p>
       <p style="text-align:center;" class="order-para">Our team will be in touch soon to arrange the delivery with you.</p>
       <p style="text-align:center;" class="order-para">All The Best,</p>
       <p style="text-align:center;" class="order-para">The Team at<strong> @"Easyfloors"</strong></p>
       <div class="purchase-details">
          <h3>Purchase Details</h3>
          <table class="purchase-table">
             <thead>
                <tr>
                   <th style="padding: 10px 2px; width: 60%" class="table-font">Product</th>
                   <th style="padding: 10px 2px;  width: 25%; text-align: center;" class="table-font">Product Price</th>
                   <th style="padding: 10px 2px;  width: 15%; text-align: center;" class="table-font">Price</th>
                </tr>
             </thead>


             <tbody>
                ${products
                  ?.map(
                    (product, index) => `
                <tr key="${index}">
                   <td style="padding: 10px 2px;" class="product-title-wrapper">
                      <div style="display:flex; gap:5px; align-items:center; justify-content:center;">
                         <img
                            src="${product.image}"
                            alt="${product.name}" style="height:70px; width:70px;" class="product-img">
                         <div>
                            <p class="table-font" style="margin-left: 5px; margin-bottom: 0px; margin-top: 0px; color: black; font-weight: 600;">${product.name}</p>
                          ${
                            orderDetails.isfreesample
                              ? `<p class="table-font" style="margin-left: 5px; margin-top: 5px; color: black;">Sample Piece</p>`
                              : product.isClearance ?  
                              `<p class="table-font" style="margin-left: 5px; margin-top: 5px; color: black;">Bundle: ${Number(product.squareMeter).toFixed(2)} SQM</p>`
                              : `<p class="table-font" style="margin-left: 5px; margin-top: 5px; color: black;"><b>${product?.category?.trim()?.toLowerCase() == 'accessories' ? 'No .of Pieces' : 'Area:'}:</b> ${product?.category?.trim()?.toLowerCase() == 'accessories' ? product.requiredBoxes : `${product.squareMeter} SQM`}</p>`
                          }
                               ${ (product?.category?.trim()?.toLowerCase() == 'accessories' || orderDetails.isfreesample) ? '' : product?.addInstallation
                         ? `
               <p class="table-font" style="margin-left: 5px; margin-top: 5px; color: black;">
                  <b>Installation Cost:</b> ${product?.installationCost.toFixed(2)}
               </p>
               `
                         : 
                         `
               <p class="table-font" style="margin-left: 5px; margin-top: 5px; color: black;">
                  <b>Installation:</b> Not included
               </p>
               `
                     }

                     ${
                       product?.selectedColor?.color
                         ? `
               <p class="table-font" style="margin-left: 5px; margin-top: 5px; color: black;">
                  <b>Color:</b> ${product?.selectedColor?.colorName} (${product?.selectedColor?.color})
               </p>
               `
                         : ''
                     }
                         </div>
                      </div>
                   </td>
                   <td class="table-font" style="text-align:center; padding: 10px 2px;">${product.price || 'Free'}</td>
                   <td class="table-font" style="text-align:center; padding: 10px 2px;">${product.totalPrice.toFixed(2) || 'Free'}</td>
                </tr>
                `,
                  )
                  .join('')}
             </tbody>


          </table>

          <body style="font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0;">
             <table style="width: 100%; border-collapse: collapse; text-align: left; margin: auto;">
                <tr>
                   <td style="width: 50%; vertical-align: top; padding: 10px  10px 10px 0px ; border-right: 2px solid #ccc;" class="user-info-wrapper">
                      <table>
                         <tr>
                            <th style="padding: 5px 5px 0px 5px;" class="table-font">Name:</th>
                         </tr>
                         <tr>
                            <td style="padding: 0px 5px 5px 5px; width: 100%;" class="table-font">${(firstName || '') + '' + lastName}</td>
                         </tr>
                         <tr>
                            <th style="padding: 5px 5px 0px 5px;" class="table-font">Email:</th>
                         </tr>
                         <tr>
                            <td style="padding: 0px 5px 5px 5px; width: 100%;" class="table-font">${email}</td>
                         </tr>
                         <tr>
                            <th style="padding: 5px 5px 0px 5px;" class="table-font">Phone:</th>
                         </tr>
                         <tr>
                            <td style="padding: 0px 5px 5px 5px; width: 100%;" class="table-font">${phone}</td>
                         </tr>
                         <tr>
                            <th style="padding: 5px 5px 0px 5px;" class="table-font">Address:</th>
                         </tr>
                         <tr>
                            <td style="padding: 0px 5px 5px 5px; width: 100%;" class="table-font">${address}, ${emirate}</td>
                         </tr>

                          <tr>
                            <th style="padding: 5px 5px 0px 5px;" class="table-font">Shipping Type:</th>
                         </tr>
                         <tr>
                            <td style="padding: 0px 5px 5px 5px; width: 100%;" class="table-font">${orderDetails?.shippingMethod?.name}</td>
                         </tr>



                      </table>
                   </td>

                   <td style="width: 30%;  padding: 10px 5px;" class="total-wrapper">
                      <table style="border-collapse: collapse;">
                         <tr>
                            <td colspan="5" style="padding: 8px;" class="table-font">Subtotal</td>
                            <td style="padding: 8px;" class="table-font">${totalPrice && shipmentFee ? totalPrice - shipmentFee : totalPrice || 0}</td>
                         </tr>
                         <tr style="border-bottom: 2px solid #ccc;">
                            <td colspan="5" style="padding: 8px;" class="table-font">Shipment</td>
                            <td style="padding: 8px;" class="table-font">${shipmentFee === 0 ? 'Free' : shipmentFee}</td>
                         </tr>
                         <tr>
                            <td colspan="5" style="padding: 8px; font-weight: bold; " class="table-font">Total Incl. VAT</td>
                            <td style="padding: 8px; font-weight: bold;" class="table-font">${totalPrice || 0}</td>
                         </tr>
                      </table>
                   </td>
                </tr>
             </table>
             </td>
             </tr>
             </table>
       </div> `
       }
</body>
<div style="text-align: center; margin-top: 20px; margin-bottom: 20px; background-color: #BF6933; padding: 14px;">
          <img src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739185483/features_lbnmr6.png" alt="features"
             style="display: block; margin: auto; max-width: 100%; height: auto;">
</div>
<div class="categories">
 <a target="_blank" href=https://easyfloors.ae/spc-flooring>SPC Flooring</a>
 <a target="_blank" href=https://easyfloors.ae/lvt-flooring>LVT Flooring</a>
 <a target="_blank" href=https://easyfloors.ae/richmond-flooring> Richmond Flooring</a>
 <a target="_blank" href=https://easyfloors.ae/polar-flooring>Polar Flooring</a>

</div>
<div class="social-icons">
 <a href="https://www.facebook.com/easyfloorsuae" target="_blank"> <img
       src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739185482/facebook-icon_tdqcrw.png"></a>
 <a href="https://www.pinterest.com/easyfloorsuae/" target="_blank"> <img
       src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739185483/pinterest-icon_dsvge7.png"
       alt="pinterest"></a>
</div>
</div>
</body>

</html>`;

  try {
    await transporter.sendMail({
      from: `${orderStatus === 'delivered' || orderStatus === 'shipped' ? (orderStatus === 'shipped' ? 'Order Shipped @EF' : 'Order Received @EF') : 'Order Confirmation @EF'} ${process.env.EMAIL_USER}`,
      to: `${process.env.EMAIL_USER},${process.env.ORDER_MAIL1},${process.env.ORDER_MAIL2},${process.env.ORDER_MAIL3}`,
      subject:
        orderStatus === 'delivered' || orderStatus === 'shipped'
          ? orderStatus === 'shipped'
            ? 'Your EasyFloor Order Is On Its Way!'
            : 'Your EasyFloor Order Has Arrived!'
          : `Order has been confirmed @ EF against Order # ${orderId}`,

      html: emailTemplate,
    });

    await transporter.sendMail({
      from: `${orderStatus === 'delivered' || orderStatus === 'shipped' ? (orderStatus === 'shipped' ? 'Order Shipped @EF' : 'Order Received @EF') : 'Order Confirmation @EF'} ${process.env.EMAIL_USER}`,
      to: CustomerEmail,
      subject:
        orderStatus === 'delivered' || orderStatus === 'shipped'
          ? orderStatus === 'shipped'
            ? 'Your EasyFloor Order Is On Its Way!'
            : 'Your EasyFloor Order Has Arrived!'
          : `Order has been confirmed @ EF against Order # ${orderId}`,

      html: emailTemplate,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
