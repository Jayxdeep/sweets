export const successResponse=(res:any,status:number,data:any)=>{
    return res.status(status).json({
        success:true,
        data
    })
}
export const errorRespone=(res:any,status:number,message:string)=>{
    return res.status(status).json({
        success:false,
        message
    })
}