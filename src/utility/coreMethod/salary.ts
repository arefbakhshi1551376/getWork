import {Salary} from "../../mvc/model/salary";
import {SalaryAddVm, SalaryDeleteVm, SalaryUpdateVm} from "../type/salary";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfSalary()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfSalary = await Salary.count()
    if (countOfSalary)
    {
        return countOfSalary
    }
    else
    {
        addNewErrorMessage(`We can not get count of address!`)
        return null
    }
}

export async function getAllSalary()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let salaryList = await Salary.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (salaryList)
    {
        return salaryList
    }
    else
    {
        return null
    }
}

export async function getSalaryById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentSalary = await Salary.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentSalary)
    {
        return currentSalary
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function getSalaryByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let salaryList: any
    if (filter)
    {
        salaryList = await Salary.find().select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        addNewErrorMessage(`You have to enter a filter!`)
        return null
    }

    if (salaryList)
    {
        return salaryList
    }
    else
    {
        addNewErrorMessage(`We can not get list of address!`)
        return null
    }
}

export async function getSalaryByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No address with id ${id} exists!`)
        return null
    }

    let currentSalary: any
    if (filter)
    {
        currentSalary = await Salary.findById(id)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentSalary = await getSalaryById(id)
    }

    if (currentSalary)
    {
        return currentSalary
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function getSalaryByAgreedStatus(isAgreed: boolean = true)
{
    emptyMessageList()

    let salaryList = await Salary.find({
        isAgreed: isAgreed
    })
        .sort(
            {
                'createDate': -1
            }
        )

    if (salaryList)
    {
        return salaryList
    }
    else
    {
        addNewErrorMessage(`We can not get list of address!`)
        return null
    }
}

export async function addNewSalary(entity: SalaryAddVm): Promise<null | boolean>
{
    emptyMessageList()

    if (entity.isAgreed)
    {
        entity.amount = 0
    }

    let currentAddressExists = await checkIfSalaryWithTheSamePropertiesExist(entity.isAgreed)
    if (currentAddressExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    let currentSalary = new Salary({
        isAgreed: entity.isAgreed,
        amount: entity.amount,
        creator: entity.creator
    })
    let result = await currentSalary.save()
    if (result)
    {
        addNewSuccessMessage('Address added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the address can not be saved!')
        return false
    }
}

export async function updateExistSalary(entity: SalaryUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getSalaryById(entity.id)

    let currentAddressExists = await checkIfSalaryWithTheSamePropertiesExist(entity.isAgreed)
    if (currentAddressExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    let result = await Salary.findByIdAndUpdate(
        entity.id,
        {
            isAgreed: entity.isAgreed,
            amount: entity.amount,
            updater: entity.updater,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The address updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The address can not be updated!`)
        return false
    }
}

export async function deleteExistSalary(entity: SalaryDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getSalaryById(entity.id)

    let result = await Salary.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The address deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The address can not be deleted!`)
        return false
    }
}

async function checkIfSalaryWithTheSamePropertiesExist(
    isAgreed: boolean
)
{
    let currentSalary = await Salary.findOne({
        isAgreed: isAgreed,
        amount: 0
    })
    return !!currentSalary;
}