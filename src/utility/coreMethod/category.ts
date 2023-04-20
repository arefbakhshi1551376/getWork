import {Skill} from "../../mvc/model/skill";
import {SkillAddVm, SkillDeleteVm, SkillUpdateVm} from "../type/skill";
import mongoose from "mongoose";
import {idIsNotValid} from "../validator";
import {Category} from "../../mvc/model/category";
import {CategoryAddVm, CategoryDeleteVm, CategoryUpdateVm} from "../type/category";

export async function getCountOfCategory()
{
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
    let skillCategory = await Category.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (skillCategory)
    {
        return skillCategory
    }
    else
    {
        return null
    }
}

export async function getCategoryByFilter(filter: any)
{
    let categoryList = await Category.find().select(`${filter}`)
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
        return null
    }
}

export async function getCategoryById(id: string)
{
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
        return null
    }
}

export async function getCategoryByIdAndFilter(id: string, filter: any)
{
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
        currentCategory = await Category.findById(id)
            .sort(
                {
                    'createDate': -1
                }
            )
    }

    if (currentCategory)
    {
        return currentCategory
    }
    else
    {
        return null
    }
}

export async function addNewCategory(entity: CategoryAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfCategoryWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentCategory = new Category({
            title: entity.title
        })
        let result = await currentCategory.save()
        if (result)
        {
            console.log(result)
            return true
        }
        else
        {
            return false
        }
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

export async function updateExistCategory(entity: CategoryUpdateVm)
{
    let titleExist = await checkIfCategoryWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.id))
        {
            return null
        }
        let currentSkill = await Category.findByIdAndUpdate(
            entity.id,
            {
                title: entity.title,
                updateDate: entity.updateDate
            }
        )
        return !!currentSkill;
    }
    else
    {
        return false
    }
}

export async function deleteExistCategory(entity: CategoryDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Category.findByIdAndRemove(entity.id)
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

async function checkIfCategoryWithTheSameTitleExist(title: string)
{
    let currentCategory = await Category.findOne({
        title: title
    })
    return !!currentCategory;
}