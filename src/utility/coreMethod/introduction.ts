import {Introduction} from "../../mvc/model/introduction";
import {IntroductionAddVm, IntroductionDeleteVm, IntroductionUpdateVm} from "../type/introduction";
import {idIsNotValid} from "../validator";

export async function getCountOfIntroduction()
{
    let countOfIntroduction = await Introduction.count()
    if (countOfIntroduction)
    {
        return countOfIntroduction
    }
    else
    {
        return null
    }
}

export async function getAllIntroduction()
{
    let introductionList = await Introduction.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (introductionList)
    {
        return introductionList
    }
    else
    {
        return null
    }
}

export async function getIntroductionByFilter(filter: any)
{
    let introductionList = await Introduction.find().select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (introductionList)
    {
        return introductionList
    }
    else
    {
        return null
    }
}

export async function getIntroductionById(id: string)
{
    let currentIntroduction = await Introduction.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentIntroduction)
    {
        return currentIntroduction
    }
    else
    {
        return null
    }
}

export async function getIntroductionByIdAndFilter(id: string, filter: any)
{
    let currentIntroduction: any
    if (filter)
    {
        currentIntroduction = await Introduction.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentIntroduction = await getIntroductionById(id)
    }

    if (currentIntroduction)
    {
        return currentIntroduction
    }
    else
    {
        return null
    }
}

export async function addNewIntroduction(entity: IntroductionAddVm): Promise<null | boolean>
{
    let currentIntroduction = new Introduction({
        title: entity.title,
        description: entity.description
    })
    let result = await currentIntroduction.save()
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

export async function updateExistIntroduction(entity: IntroductionUpdateVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let currentIntroduction = await Introduction.findByIdAndUpdate(
        entity.id,
        {
            title: entity.title,
            updateDate: entity.updateDate
        }
    )
    return !!currentIntroduction;
}

export async function deleteExistIntroduction(entity: IntroductionDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Introduction.findByIdAndRemove(entity.id)
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