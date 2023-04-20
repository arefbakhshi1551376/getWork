import {Salary} from "../../mvc/model/salary";
import {SalaryAddVm, SalaryDeleteVm, SalaryUpdateVm} from "../type/salary";
import {idIsNotValid} from "../validator";

export async function getCountOfSalary()
{
    let countOfSalary = await Salary.count()
    if (countOfSalary)
    {
        return countOfSalary
    }
    else
    {
        return null
    }
}

export async function getAllSalary()
{
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

export async function getSalaryByFilter(filter: any)
{
    let salaryList = await Salary.find().select(`${filter}`)
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
        return null
    }
}

export async function getSalaryByAgreedStatus(agreedStatus: boolean = true)
{
    let salaryList = await Salary.find({
        isAgreed: agreedStatus
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
        return null
    }
}

export async function addNewSalary(entity: SalaryAddVm): Promise<null | boolean>
{

    let currentGender = new Salary({
        isAgreed: entity.isAgreed,
        amount: entity.isAgreed ? 0 : entity.amount
    })
    let result = await currentGender.save()
    if (result)
    {
        console.log(result)
        return true
    }
    else
    {
        return false
    }


    // currentAddress.save()
    //     .then(value =>
    //     {
    //         console.log(value)
    //         return true
    //     })
    //     .catch(reason =>
    //     {
    //         console.log(reason)
    //         return false
    //     })
}

export async function updateExistSalary(entity: SalaryUpdateVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let currentSalary = await Salary.findByIdAndUpdate(
        entity.id,
        {
            isAgreed: entity.isAgreed,
            amount: entity.isAgreed ? 0 : entity.amount,
            updateDate: entity.updateDate
        }
    )
    return !!currentSalary;
}

export async function deleteExistSalary(entity: SalaryDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Salary.findByIdAndRemove(entity.id)
    return !!result;
    // .then(value =>
    // {
    //     if (value)
    //     {
    //         console.log(value)
    //         return true
    //     }
    //     else
    //     {
    //         console.log('Error while removing country!')
    //         return false
    //     }
    // })
    // .catch(reason =>
    // {
    //     console.log(reason)
    //     return false
    // })
}