import express from "express";
import {addNewAddress, getAllAddress} from "../utility/coreMethod/address";
import {AddressAddVM} from "../utility/type/address";
import {showMessageForEveryThing} from "../utility/showResponseMessage";
import {modelsName, whatHappened} from "../utility/constant";

export const addressRouter = express.Router()

addressRouter.get(
    `/`,
    async (req, res) =>
    {
        let addressList = await getAllAddress()
        if (addressList != null)
        {
            console.log(modelsName.CareerHistory.toString())
            return res.status(200).json(addressList)
        }
        else
        {
            return res.status(404).json({
                Message: 'No Address Found!!!'
            })
        }
    }
)

addressRouter.post(
    `/`,
    async (req, res) =>
    {
        let currentAddressAddVm: AddressAddVM = {
            city: req.body.city,
            restOfAddress: req.body.restOfAddress
        }
        let result = await addNewAddress(currentAddressAddVm)
        if (result == true)
        {
            return showMessageForEveryThing(res, 200, modelsName.Address, whatHappened.Added);
        }
    }
)