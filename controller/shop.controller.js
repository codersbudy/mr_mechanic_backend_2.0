
import { validationResult } from "express-validator"
import { Shop } from "../model/shop.model.js";
import { response } from "express";
import { Shopkeeper } from "../model/shopkeeper.model.js";
import { Mechanic } from "../model/mechanic.model.js";
import bcrypt from "bcryptjs";
import Jwt from "../middleware/verification.js"
export const save = async (request, response, next) => {
    try {
        let already = await Shop.findOne({ contactNo: request.body.contactNo })
        console.log(already);
        if (already) {
            return response.status(200).json({ err: "account is already register.....", status: true });
        }
        let saltKey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
        request.body.password = encryptedPassword;
        let shop = await Shop.create(request.body);
        return response.status(200).json({ message: shop, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}
export const signIn = async (request, response, next) => {
    try {
        let shop = await Shop.findOne({
            contactNo: request.body.contactNo
        });
        if (!shop)
            return response.status(400).json({ err: "bad request", status: false });
        let status = await bcrypt.compare(request.body.password, shop.password);
        if (!status)
            return response.status(402).json({ err: "bad request", status: false });
        let payload = { subject: shop.email };
        let token = Jwt.sign(payload, "ccooddeerrHHuubb");
        shop.password = undefined;
        return response.status(200).json({ messages: "signIn successfully.....", result: shop, status: true, token: token });
    }
    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false });
    }
}

export const remove = (request, response, next) => {
    Shop.findByIdAndDelete(request.body._id)
        .then(result => {
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })
        })
}

export const getList = (request, response, next) => {
    Shop.find()
        .then(result => {

            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            console.log(err);

            return response.status(500).json({ err: "internal server error", status: false })
        })
}

export const id = (request, response, next) => {
    console.log(request.body.shopId);
    Shop.findById(request.body.shopId)
        .then(result => {
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })
        })
}

export const updateShop = async (request, response, next) => {
    try {
      const { shopName, photo, address, latLong, _id } = request.body;
      const updatedShop = await Shop.findOneAndUpdate(
        { _id: _id },
        { shopName, photo, address, latLong },
        { new: true }
      );
  
      if (!updatedShop) {
        return response.status(404).json({ error: "Shop not found", status: false });
      }
  
      return response.status(200).json({ shop: updatedShop, status: true });
    } catch (err) {
      return response.status(500).json({ error: "Internal server error", status: false });
    }
  };
  

  export const updateStatus = async (request, response, next) => {
    try {
      const { shopStatus, _id } = request.body;
  
      const updatedShop = await Shop.findByIdAndUpdate(
        _id,
        { shopStatus },
        { new: true }
      );
  
      if (!updatedShop) {
        return response.status(404).json({ error: "Shop not found", status: false });
      }
  
      return response.status(200).json({ update: updatedShop, status: true });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error", status: false });
    }
  };
  


export const nearByShop = async (request, response, next) => {
    try {
        let shop = await Shop.find();
        shop = shop.filter((shopItem) => (distance(request.body.lat, request.body.long, shopItem.latLong.split(",")[0], shopItem.latLong.split(",")[1]) <= 5.0))
        if (shop)
            return response.status(200).json({ shop: shop, status: true, message: "near by shop found" });

        return response.status(200).json({ shop: shop, status: false, message: "near by shop not found" })

    }
    catch (err) {
        return response.status(500).json({ message: "Internal server error", status: false })
    }
}

function distance(lat1, lon1, lat2, lon2, unit) {
    console.log(lat1 + " ---lat1" + lon1 + "  --lon1" + lat2 + "  --lat2" + lon2 + "  --lon2");
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344

    //   count++
    console.log(dist);
    return dist

}


export const bulkSave = (request, response) => {
    // request.body.shopdetails.map(async(shop,index)=>{
    //      let saltKey = await bcrypt.genSalt(10);
    //      shop.password = await bcrypt.hash("Coder@123", saltKey);

    // })
    Shop.insertMany(request.body.shopDetails)
        .then(result => {
            return response.json({ message: "save", result: result });
        }).catch(err => {
            console.log(err);
            return response.json({ error: "error" });
        })
}

// export const searchByKeyword = async (request, response) => {
//     try {
//         const keyword = request.body.keyword;
//         const results = await Shop.find({
//             $or: [
//                 { "address": { $regex: keyword, $options: 'i' } },
//                 { "shopName": { $regex: keyword, $options: 'i' } },
//                 { "categories": { $regex: keyword, $options: 'i' } },

//             ]
//         });
//         return response.status(200).json({ results: results, status: true });
//     } catch (error) {
//         console.error(error);
//         response.status(500).send('Server Error');
        // export const nearByShop =async (request, response, next)=>{
        //     try{
        //      let shop = await Shop.find();
        //       shop = shop.filter((shopItem)=>(distance(22.715362124464562, 75.84329461593786,shopItem.latLong.split(",")[0],shopItem.latLong.split(",")[1])<=5.0))
        //       if(shop)
        //         return response.status(200).json({shop: shop, status: true, message: "near by shop found"});

        //       return response.status(200).json({shop: shop, status: false, message: "near by shop not found"})
        //     }
        //     catch(err) {
        //        return response.status(500).json({message: "Internal server error", status: false})
//     }

// }

export const registrationVerifyOtp = async (request, response, next) => {
    try {
      
        let shop = await Shop.findOne({ contact: request.body.contact })
        console.log(customer);
        if (!customer) {
            let tempraryPassword = Math.floor(100000 + Math.random() * 900000);
            var to = "+91" + request.body.contact;
            console.log(to);
            const accountSid = 'ACcc7900d25b421f1bc2923e7317631638';
            const authToken = 'dffda79b48ff8bc2cdab0a6c03eb0f25';
            const client = Twilio(accountSid, authToken);

            const message = await client.messages.create({
                body: `Your OTP is: ${tempraryPassword}`,
                from: '+13203738823', 
                to
            });

            console.log('OTP sent:', message.sid);
            return response.status(200).json({ otp: tempraryPassword, status: true });
        }
        else {
            console.log("inner elese")
            return response.status(450).json({ err: "contact already register please log in", status: false })
        }
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        response.status(550).json({ error: 'Failed to send OTP' });
    }
}

export const forgotPassword = async (request, response, next) => {

    try {
      
        let shop = await Shop.findOne({ contact: request.body.contact })
        console.log(shop);
        if (shop) {
            let tempraryPassword = Math.floor(100000 + Math.random() * 900000);
            var to = "+91" + request.body.contact;
            console.log(to);
            const accountSid = 'ACcc7900d25b421f1bc2923e7317631638';
            const authToken = 'dffda79b48ff8bc2cdab0a6c03eb0f25';
            const client = Twilio(accountSid, authToken);
            const message = await client.messages.create({
                body: `Your OTP is: ${tempraryPassword}`,
                from: '+13203738823', 
                to
            });

            console.log('OTP sent:', message.sid);
            Shop.updateOne({shop: shop.contact }, { tempraryPassword: tempraryPassword })
                .then(result => {
                    return response.status(200).json({ result: 'email sent successful', shop: shop, status: true })

                })
                .catch(err => {
                    return response.status(500).json({ err: "internal server error", status: false });
                })
        }
        else {
            return response.status(450).json({ err: "customer not found", status: false })
        }
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        response.status(550).json({ error: 'Failed to send OTP' });
    }
}


export const verifyOtp = async (request, response, next) => {
    try {
        let shop = await Shop.findOne({ contact: request.body.contact });
        console.log(shop);
        if (shop) {
            console.log("object ka temprary" + shop.tempraryPassword);
            console.log("body ka temprary" + request.body.tempraryPassword);
            if (shop.tempraryPassword == request.body.tempraryPassword) {
                return response.status(200).json({ result: "Verify successfully", status: true });
            }
            else
                return response.status(401).json({ message: "your temprary password not match", status: false });
        }
        else
            return response.status(401).json({ message: "bad request", status: false });
    }
    catch (err) {
        console.log(err);
        response.status(500).json({ err: "internal server error", status: false });
    }
}

export const setPassword = async (request, response, next) => {
    try {
        let shop = await Shop.findOne({ contact: request.body.contact });
        if (shop) {
            let saltKey = await bcrypt.genSalt(10);
            let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
            request.body.password = encryptedPassword;
            let update = await Shop.updateOne({ contact: shop.contact }, {
                "$set": {
                    password: request.body.password, tempraryPassword: null
                }
            });
            if (update)
                return response.status(200).json({ result: update, status: true });
            return response.status(400).json({ message: "bad ", status: false });
        }
        else
            return response.status(401).json({ message: "bad request", status: false });
    }
    catch (err) {
        console.log(err);
        response.status(500).json({ err: "internal server error", status: false });
    }
}
