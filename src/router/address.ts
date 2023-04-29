import express from "express";
import {
    addNewAddress, deleteExistAddress,
    getAddressByFilter,
    getAddressById, getAddressByIdAndFilter,
    getAllAddress,
    getCountOfAddress, updateExistAddress
} from "../utility/coreMethod/address";
import {AddressAddVM, AddressDeleteVM, AddressUpdateVM} from "../utility/type/address";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const addressRouter = express.Router()

addressRouter.get(
    `/`,
    async (req, res) =>
    {
        let addressList = await getAllAddress()
        if (addressList != null)
        {
            return res.status(200).json(addressList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

addressRouter.get(
    `/count`,
    async (req, res) =>
    {
        let addressCount = await getCountOfAddress()
        if (addressCount != null)
        {
            return res.status(200).json(`Count of address: ${addressCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

addressRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let addressList = await getAddressByFilter(req.params.filter)
        if (addressList != null)
        {
            return res.status(200).json(addressList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

addressRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let addressList = await getAddressByIdAndFilter(req.params.id, req.params.filter)
        if (addressList != null)
        {
            return res.status(200).json(addressList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

addressRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentAddress = await getAddressById(req.params.id)
        if (currentAddress != null)
        {
            return res.status(200).json(currentAddress)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

addressRouter.post(
    '/',
    async (req, res) =>
    {
        let currentAddressAddVm: AddressAddVM = {
            creator: currentAuthType.LOGIN_USER_ID,
            city: req.body.city,
            restOfAddress: req.body.restOfAddress
        }
        let result: boolean | null = await addNewAddress(currentAddressAddVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(400).json(getErrorMessageList())
        }
    }
)

addressRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentAddressUpdateVm: AddressUpdateVM = {
            updater: currentAuthType.LOGIN_USER_ID,
            updateDate: new Date(),
            id: req.params.id,
            city: req.body.city,
            restOfAddress: req.body.restOfAddress
        }
        let result: null | boolean = await updateExistAddress(currentAddressUpdateVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(400).json(getErrorMessageList())
        }
    }
)


addressRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentAddressDeleteVm: AddressDeleteVM = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistAddress(currentAddressDeleteVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(400).json(getErrorMessageList())
        }
    }
)
