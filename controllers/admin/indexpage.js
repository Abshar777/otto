const orderModel= require('../../models/ordermodel')
const cartModel = require('../../models/cartmodel')


const indexPage = (req, res) => {
    try {
      res.render("admin/index");
    } catch (error) {
      console.log(error.messege);
    }
  };

const recentOrder=async(req,res)=>{
try {
    const recentOrders = await orderModel.find({}).sort({orderDate:-1}).populate('userId').select({userId:1,products:1,orderDate:1}).limit(6)

    console.log(recentOrders);
    res.send({result:recentOrders})
} catch (error) {
    console.log(error.messege);
    
}
}


  const salesData= async (req,res)=>{
    try {
      
      const data = {
          labels: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01', '2023-07-01'],
          sales: [65000, 59000, 80000, 81000, 56000, 55000, 40000],
          revenue: [120000, 110000, 150000, 140000, 130000, 100000, 90000]
      };

      res.json(data);
  } catch (error) {
      console.error('Error fetching sales data:', error);
      res.status(500).send('Internal Server Error');
  }
  }
  const Topusers= async (req,res)=>{
    try {
      
        const topUsers = await orderModel.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$userId", // Group by userId
                    totalQuantity: { $sum: "$products.quantity" } // Sum the quantity of products
                }
            },
            {
                $lookup: {
                    from: "users", // Join with users collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" }, // Unwind the userDetails array
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    name: "$userDetails.name",
                    totalQuantity: 1
                }
            },
            { $sort: { totalQuantity: -1 } } // Sort by total quantity in descending order
        ]);
        res.send({result:topUsers})

  } catch (error) {
      console.error('Error fetching sales data:', error);
      res.status(500).send('Internal Server Error');
  }
  }


  const salesChart=async(req,res)=>{
    const currentYear = new Date().getFullYear();

    const salesData = await orderModel.aggregate([
        {
            $match: {
                orderDate: {
                    $gte: new Date(`${currentYear}-01-01`), 
                    $lt: new Date(`${currentYear + 1}-01-01`) 
                }
            }
        },
        {
            $group: {
                _id: { $month: "$orderDate" },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 } 
        }
    ]);

    
    const monthlyCounts = Array(12).fill(0);

    
    salesData.forEach(item => {
        monthlyCounts[item._id - 1] = item.count;
    });
    
    res.send({monthlyCounts})
  }


  
  const stausCount =async (req,res)=>{
    try {
        const statusCounts = await orderModel.aggregate([
            { $unwind: '$products' }, 
            { 
                $group: {
                    _id: '$products.orderStatus',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    orderStatus: '$_id',
                    count: 1
                }
            }
        ]);

        
        const statusCountObj = {};
        statusCounts.forEach(status => {
            statusCountObj[status.orderStatus] = status.count;
        });
        // console.log(statusCountObj);
        
        res.send({statusCountObj})

    } catch (error) {
       console.log(error.messege);
        
    }
}

const slaesByCat=async(req,res)=>{
    try{
        console.log('akaka');
        
        const salesData = await orderModel.aggregate([
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "products",
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" },
            {
                $group: {
                    _id: "$productDetails.category",
                    totalSold: { $sum: "$products.quantity" }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { $unwind: "$categoryDetails" },
            {
                $project: {
                    _id: 0,
                    categoryName: "$categoryDetails.name",
                    count: "$totalSold"
                }
            }
        ]);

        // Convert to desired format { catName: count }
        const salesByCategory = salesData.reduce((acc, item) => {
            acc[item.categoryName] = item.count;
            return acc;
        }, {});

        // console.log(salesByCategory,salesData);
        
        res.send({result:salesByCategory})
    }catch(err){
        console.log(err.messege)
    }
}
  
  

module.exports={
    indexPage,
    salesData,
    salesChart,
    stausCount,
    slaesByCat,
    recentOrder,
    Topusers
}