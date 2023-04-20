import {Degree} from "../../mvc/model/degree";
import {DegreeAddVm, DegreeDeleteVm, DegreeUpdateVm} from "../type/degree";
import {idIsNotValid} from "../validator";

export async function getCountOfDegree()
{
    let countOfDegree = await Degree.count()
    if (countOfDegree)
    {
        return countOfDegree
    }
    else
    {
        return null
    }
}

export async function getAllDegree()
{
    let degreeList = await Degree.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (degreeList)
    {
        return degreeList
    }
    else
    {
        return null
    }
}

export async function getDegreeByFilter(filter: any)
{
    let degreeList = await Degree.find().select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (degreeList)
    {
        return degreeList
    }
    else
    {
        return null
    }
}

export async function getDegreeById(id: string)
{
    let currentDegree = await Degree.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentDegree)
    {
        return currentDegree
    }
    else
    {
        return null
    }
}

export async function getDegreeByIdAndFilter(id: string, filter: any)
{
    let currentDegree: any
    if (filter)
    {
        currentDegree = await Degree.findById(id).select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            )
    }
    else
    {
        currentDegree = await Degree.findById(id)
            .sort(
                {
                    'createDate': -1
                }
            )
    }

    if (currentDegree)
    {
        return currentDegree
    }
    else
    {
        return null
    }
}

export async function addNewDegree(entity: DegreeAddVm): Promise<null | boolean>
{

    let currentDegree = new Degree({
        instituteName: entity.instituteName,
        trainingCourse: entity.trainingCourse,
        dateOfIssue: entity.dateOfIssue,
    })
    let result = await currentDegree.save()
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

export async function updateExistDegree(entity: DegreeUpdateVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let currentDegree = await Degree.findByIdAndUpdate(
        entity.id,
        {
            instituteName: entity.instituteName,
            trainingCourse: entity.trainingCourse,
            dateOfIssue: entity.dateOfIssue,
            updateDate: entity.updateDate
        }
    )
    return !!currentDegree;
}

export async function deleteExistDegree(entity: DegreeDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Degree.findByIdAndRemove(entity.id)
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