const Order = require('./order.model.js')

const createAOrder =  async(req,res) =>{

  try {
    const newOrder = await Order(req.body);
    const savedOrders = await newOrder.save();
    res.status(200).json(savedOrders);

  } catch (error) {
    console.error("Error creating order",error);
    res.status(500).json({message:"Failed to create order"});
  }
};

const getOrdersByEmail = async (req, res) => {
  try {
    const {email}=req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders ) {
      return res.status(404).json({ message: "No orders found for this email" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by email", error);
    res.status(500).json({ message: "Failed to fetch orders" });
    
  }
}

module.exports = {
    createAOrder,
    getOrdersByEmail,
}