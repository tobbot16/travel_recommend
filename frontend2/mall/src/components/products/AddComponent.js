import React, { useRef, useState } from 'react';
import { postAdd } from '../../api/productsAPI';
import FetchingModal from '../common/FetchingModal';
import ResultModal from '../common/ResultModal';
import useCustomMove from '../../hooks/useCustomMove';

const initstate = {

    pname:'',
    pdesc:'',
    price:0,
    files: []

}


function AddComponent(props) {

    const [product, setProduct] = useState(initstate)

    const uploadRef = useRef()

    const [fetching, setFetching] = useState(false)

    const [result, setResult] = useState(false)

    const {moveToList} = useCustomMove()

    //변경
    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value;
        setProduct({...product})
    }

    

    const handleClickAdd = (e) => {
        console.log(product)

        const files = uploadRef.current.files
        const formData = new FormData()

        
        for(let i = 0; i < files.length; i++){
            formData.append("files", files[i])
        }

        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)

        console.log(formData)

        setFetching(true)

        postAdd(formData).then(data => {

            setFetching(false)
            setResult(data.result)
        })


    }

    const closeModal = () => {
        setResult(null)
        moveToList({page:1})
    }

    return (
<div className="border-2 border-sky-200 mt-10 m-2 p-4">
  {/* Product Name */}
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
      <input
        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
        name="pname"
        type="text"
        value={product.pname}
        onChange={handleChangeProduct}
      />
    </div>
  </div>

  {/* Description */}
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">Desc</div>
      <textarea
        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
        name="pdesc"
        rows="4"
        value={product.pdesc}
        onChange={handleChangeProduct}
      />
    </div>
  </div>

  {/* Price */}
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">Price</div>
      <input
        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
        name="price"
        type="number"
        value={product.price}
        onChange={handleChangeProduct}
      />
    </div>
  </div>

  {/* File Upload */}
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">Files</div>
      <input
        ref={uploadRef}
        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
        type="file"
        multiple={true}
      />
    </div>
  </div>

  {/* Submit Button */}
  <div className="flex justify-end">
    <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
      <button
        type="button"
        className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
        onClick={handleClickAdd}
      >
        ADD
      </button>
    </div>
  </div>
  {fetching ? <FetchingModal/> : <></>}
  {result ? 
  <ResultModal
    callbackFn={closeModal}
    title={'Product Add Result'}
    content = {`${result}번 상품 등록 완료`}/>
    : <></>}
</div>




    );
}

export default AddComponent;
