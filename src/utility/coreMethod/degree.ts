import {Degree} from "../../mvc/model/degree";
import {DegreeAddVm, DegreeDeleteVm, DegreeUpdateVm} from "../type/degree";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfDegree()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfDegree = await Degree.count()
    if (countOfDegree)
    {
        return countOfDegree
    }
    else
    {
        addNewErrorMessage(`We can not get count of degree!`)
        return null
    }
}

export async function getAllDegree()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

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
        addNewErrorMessage(`We can not get list of degree!`)
        return null
    }
}

export async function getDegreeById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current degree!`)
        return null
    }
}

export async function getDegreeByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let degreeList: any
    if (filter)
    {
        degreeList = await Degree.find().select(`${filter}`)
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

    if (degreeList)
    {
        return degreeList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of degree!`)
        return null
    }
}

export async function getDegreeByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No degree with id ${id} exists!`)
        return null
    }

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
        currentDegree = await getDegreeById(id)
    }

    if (currentDegree)
    {
        return currentDegree
    }
    else
    {
        addNewErrorMessage(`We can not get current degree!`)
        return null
    }
}

export async function addNewDegree(entity: DegreeAddVm): Promise<null | boolean>
{
    emptyMessageList()

    let currentDegree = new Degree({
        instituteName: entity.instituteName,
        trainingCourse: entity.trainingCourse,
        dateOfIssue: entity.dateOfIssue,
    })
    let result = await currentDegree.save()
    if (result)
    {
        addNewSuccessMessage('Degree added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the degree can not be saved!')
        return false
    }
}

export async function updateExistDegree(entity: DegreeUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getDegreeById(entity.id)

    let result = await Degree.findByIdAndUpdate(
        entity.id,
        {
            instituteName: entity.instituteName,
            trainingCourse: entity.trainingCourse,
            dateOfIssue: entity.dateOfIssue,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The degree updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The degree can not be updated!`)
        return false
    }
}

export async function deleteExistDegree(entity: DegreeDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getDegreeById(entity.id)

    let result = await Degree.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The degree deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The degree can not be deleted!`)
        return false
    }
}