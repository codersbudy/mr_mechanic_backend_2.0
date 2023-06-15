import bcrypt from "bcryptjs";
import { request, response } from "express";
import Jwt from "../middleware/verification.js"
import { validationResult } from "express-validator";
import { Customer } from '../model/customer.model.js'
import nodemailer from 'nodemailer';
import Twilio from "twilio";

export const signUp = async (request, response, next) => {
    try {
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", messages: errors.array() });

        let already = await Customer.find({
            contact: request.body.contact,
        })
        if (already.length)
            return response.status(200).json({ err: "account is already register.....", status: true });
        let saltKey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
        request.body.password = encryptedPassword;
        let customer = await Customer.create(request.body);
        return response.status(200).json({ customer: customer, customerData: { customerName: customer.customerName, customerContact: customer.contact, customerId: customer._id }, status: true });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const signIn = async (request, response, next) => {
    try {
        let customer = await Customer.findOne({ contact: request.body.contact });
        if (customer) {
            let status = await bcrypt.compare(request.body.password, customer.password);
            if (status) {
                let payload = { subject: customer.contact };
                let token = Jwt.sign(payload, "coderHub");
                return response.status(200).json({ messages: "signIn successfully.....", status: true, token: token, customer: { ...customer.toObject(), password: undefined, token: token } });
            }
            else
                return response.status(400).json({ err: "bad request", status: false });
        }
    }

    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false });
    }
}


export const updataProfile = async (request, response, next) => {
    try {

        console.log(request.body);
        const contact=request.body.contact;
        const customerName=request.body.customerName;
        const email =request.body.email;
        let photo=null;
        if(!(typeof request.file === "undefined")){
             photo=request.file.filename;
        }
        // request.body.photo = request.file.filename;
        let status = await Customer.findOne({contact:request.body.contact})
        // console.log(status);
        if (status) {
            let update = await Customer.updateOne({ contact}, photo?{photo, customerName, email}:{ customerName, email})


            return response.status(200).json({ result: update, status: true });
        }
        else
            return response.status(401).json({ message: "bad request", status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "internal server ", status: false });
    }
}

export const id = async (request, response, next) => {
    try {
        let customer = await Customer.findOne({ contact: request.body.contact })
        customer ? response.status(200).json({ result: customer, status: true }) : response.status(401).json({ message: "wrong contact number", status: false });
    }
    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false })
    }
}

export const forgotPassword = async (request, response, next) => {

    try {
      
        let customer = await Customer.findOne({ contact: request.body.contact })
        console.log(customer);
        if (customer) {
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
            Customer.updateOne({ contact: customer.contact }, { tempraryPassword: tempraryPassword })
                .then(result => {
                    return response.status(200).json({ result: 'email sent successful', customer: customer, status: true })

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
        let customer = await Customer.findOne({ contact: request.body.contact });
        console.log(customer);
        if (customer) {
            console.log("object ka temprary" + customer.tempraryPassword);
            console.log("body ka temprary" + request.body.tempraryPassword);
            if (customer.tempraryPassword == request.body.tempraryPassword) {
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
        let customer = await Customer.findOne({ contact: request.body.contact });
        if (customer) {
            let saltKey = await bcrypt.genSalt(10);
            let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
            request.body.password = encryptedPassword;
            let update = await Customer.updateOne({ contact: customer.contact }, {
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

export const registrationVerifyOtp = async (request, response, next) => {
    try {
      
        let customer = await Customer.findOne({ contact: request.body.contact })
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

export const bulkSave = (request, response) => {
    Customer.insertMany(request.body.customerdetails)
        .then(result => {
            return response.json({ message: "save", result: result });
        }).catch(err => {
            console.log(err);
            return response.json({ error: "error" });
        })
}


export const bcryptPassword = async (request, response, next) => {
    try {
      const newPassword = request.body.newPassword;
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await Customer.updateMany({}, { password: hashedPassword });
  
      response.status(200).json({ message: 'Passwords updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  

