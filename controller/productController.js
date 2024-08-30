import {getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDB,addToCartDB} from '../model/productDb.js'
import { getUserDb } from '../model/userDB.js'

 const getProducts = async(req,res)=>{
    res.json(await getProductsDb())
}
const getProduct = async(req,res)=>{
    res.json(await getProductDb(req.params.prodID))
}
const insertProduct = async(req,res)=>{
    let {prodName,prodDescription,prodFeatures,quantity,prodSound,prodPackage,amount,category,prodUrl} =req.body
    
    await insertProductDb(prodName,prodDescription,prodFeatures,quantity,prodSound,prodPackage,amount,category,prodUrl)
    res.send('Product was inserted successfully')
}
const deleteProduct = async(req,res)=>{
    await deleteProductDb(req.params.prodID)
    res.send('Product has been deleted')
}

const updateProduct = async(req,res)=>{
    let {prodName,prodDescription,prodFeatures,quantity,prodSound,prodPackage,amount,category,prodUrl} = req.body
    let product = await getProductDb(req.params.prodID)
    prodName ? prodName=prodName: prodName = product.prodName
    prodDescription ? prodDescription=prodDescription: prodDescription = product.prodDescription
    prodFeatures ? prodFeatures=prodFeatures: prodFeatures = product.prodFeatures
    quantity ? quantity=quantity: quantity = product.quantity
    prodSound ? prodSound=prodSound: prodSound = product.prodSound
    prodPackage ? prodPackage=prodPackage: prodPackage = product.prodPackage
    amount ? amount=amount: amount = product.amount
    category ? category=category: category = product.category
    prodUrl ? prodUrl=prodUrl: prodUrl = product.prodUrl
    await updateProductDB(req.params.prodID,prodName,prodDescription,prodFeatures,quantity,prodSound,prodPackage,amount,category,prodUrl)
    res.send('Update Product was successful')
}

const addToCart = async (req,res)=>{
    console.log(req.body);
    let {prodID} = await getUserDb(req.body.user)
    console.log(prodID);
    

    // await addToCartDB(req.body.id,id)
    res.json({message:"You've added an item to cart"})
    
}
export {getProducts, getProduct, insertProduct, deleteProduct, updateProduct,addToCart}







