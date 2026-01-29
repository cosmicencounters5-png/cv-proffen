const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [
    {
      price: priceId,
      quantity: 1,
    },
  ],
  metadata: {
    user_id: body.userId,
    package: packageType,
  },
  success_url: "https://www.cv-proffen.no/success",
  cancel_url: "https://www.cv-proffen.no/cv",
})