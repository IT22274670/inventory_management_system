const posModel = require('../models/postransactionModel');
const mongoose = require('mongoose');

const newtransactionController = async(req, res) => {
    try {
        const transaction = new posModel(req.body);
        await transaction.save();

        return res.status(201).send({
            sucess : true,
            message : "Transaction Sucessfully",
            transaction
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess : false,
            message : "Error in transaction api",
            error
        });
    }
};

const getoneTransaction = async(req,res) => {
    try {
        const transaction = await posModel.findOne({transactionID:req.params.tid});

        if(!transaction) {
            return res.status(404).send({
                success : false,
                message : "Transaction Not Found!",
            });
        }

        res.status(200).json({
            status : "success",
            data : {
                transaction
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess : false,
            message : "Error in Fetch API!",
            error
        })
    }
};

const deleteTransaction = async (req, res) => {
    try {
        await posModel.findByIdAndDelete(req.params.objid);
        res.status(200).send({
            success: true,
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete API!",
            error: error.message
        });
    }
};

module.exports = { newtransactionController, getoneTransaction, deleteTransaction };