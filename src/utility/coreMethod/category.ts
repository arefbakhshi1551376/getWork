import {idIsNotValid} from "../validator";
import {Category} from "../../mvc/model/category";
import {CategoryAddVm, CategoryDeleteVm, CategoryUpdateVm} from "../type/category";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfCategory()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfCategory = await Category.count()
    if (countOfCategory)
    {
        return countOfCategory
    }
    else
    {
        return null
    }
}

export async function getAllCategory()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let categoryList = await Category.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (categoryList)
    {
        return categoryList
    }
    else
    {
        addNewErrorMessage(`We can not get list of category!`)
        return null
    }
}

export async function getCategoryById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No category with id ${id} exists!`)
        return null
    }

    let currentCategory = await Category.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentCategory)
    {
        return currentCategory
    }
    else
    {
        addNewErrorMessage(`We can not get current category!`)
        return null
    }
}

export async function getCategoryByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let categoryList: any

    if (filter)
    {
        categoryList = await Category.find().select(`${filter}`)
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

    if (categoryList)
    {
        return categoryList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of category!`)
        return null
    }
}

export async function getCategoryByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No category with id ${id} exists!`)
        return null
    }

    let currentCategory: any
    if (filter)
    {
        currentCategory = await Category.findById(id).select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            )
    }
    else
    {
        currentCategory = await getCategoryById(id)
    }

    if (currentCategory)
    {
        return currentCategory
    }
    else
    {
        addNewErrorMessage(`We can not get current category!`)
        return null
    }
}

export async function addNewCategory(entity: CategoryAddVm): Promise<null | boolean>
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let currentCategoryExists = await checkIfCategoryWithTheSameTitleExist(entity.title)
    if (currentCategoryExists)
    {
        addNewErrorMessage('A category with the same properties exists!')
        return null
    }

    let currentCategory = new Category({
        title: entity.title,
        creator: entity.creator
    })
    let result = await currentCategory.save()
    if (result)
    {
        addNewSuccessMessage('Category added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the category can not be saved!')
        return false
    }
}

export async function updateExistCategory(entity: CategoryUpdateVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getCategoryById(entity.id)

    let currentCategoryExists = await checkIfCategoryWithTheSameTitleExist(entity.title)
    if (currentCategoryExists)
    {
        addNewErrorMessage('A category with the same properties exists!')
        return null
    }

    let result = await Category.findByIdAndUpdate(
        entity.id,
        {
            title: entity.title,
            updater: entity.updater,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The category updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The category can not be updated!`)
        return false
    }
}

export async function deleteExistCategory(entity: CategoryDeleteVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getCategoryById(entity.id)

    let result = await Category.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The category deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The category can not be deleted!`)
        return false
    }
}

async function checkIfCategoryWithTheSameTitleExist(title: string)
{
    let currentCategory = await Category.findOne({
        title: title
    })
    return !!currentCategory;
}