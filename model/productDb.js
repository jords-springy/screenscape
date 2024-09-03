import { pool } from "../config/config.js";
const getProductsDb = async ()=>{
    let [data] = await pool.query('SELECT * FROM bfgktuen9wud2azxdgho.products')
    return data
}
const getProductDb = async (prodID) =>{
    let [[data]] = await pool.query('SELECT * FROM bfgktuen9wud2azxdgho.products WHERE prodID = ?',[prodID])
    return data
}
const insertProductDb = async(prodName,prodDescription,prodFeatures,quantity,prodSound,prodPackage,amount,category,prodUrl) =>{
    await pool.query(`
        INSERT INTO bfgktuen9wud2azxdgho.products
        (prodName,prodDescription,prodFeatures,quantity,prodSound,prodPackage,amount,category,prodUrl)
        VALUES (?,?,?,?,?,?,?,?,?)
        `,[prodName,prodDescription,prodFeatures,quantity,prodSound,prodPackage,amount,category,prodUrl])
}
const deleteProductDb = async(prodID) =>{
    await pool.query('DELETE FROM bfgktuen9wud2azxdgho.products WHERE prodID = ?', [prodID])
}
const updateProductDB = async (prodID,prodName,prodDescription,prodFeatures,quantity,prodSound,prodPackage,amount,category,prodUrl)=>{
    await pool.query('UPDATE bfgktuen9wud2azxdgho.products SET prodName = ?,prodDescription = ?, prodFeatures = ?,quantity = ?,prodSound = ?,prodPackage = ?,amount = ?,category = ?,prodUrl = ?  WHERE prodID = ?',[prodName,prodDescription,prodFeatures,quantity,prodSound,prodPackage,amount,category,prodUrl,prodID]
    )
}

const addToCartDB = async (prodID,userID)=>{
    await pool(`INSERT INTO bfgktuen9wud2azxdgho.products
        (prodID,userID)
        VALUES (?,?)`)
        ,[prodID,userID]
}

export {getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDB,addToCartDB}