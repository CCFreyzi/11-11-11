import s from "@/app/shop/[id]/id.module.scss";
import Link from "next/link";
import {OutputDescription, Size} from "@/components/product_page/ProductPageComponent";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addProductInBag} from "@/store/slices/bagProducts-slice";
import {GenerateDescription} from "@/components/generate_description/generate_description";

export const ProductInformation = ({product}) => {
    const dispatch = useDispatch()
    const [sizeAddToBag, setSizeAddToBag] = useState('size')

    const addToBag = {
        id: product.id,
        sizeName: sizeAddToBag,
        count: 1,
    }


    const addProductToBag = () => {
        let bagItems = JSON.parse(localStorage.getItem('bag')) || [];

        bagItems.push(addToBag)
        localStorage.setItem('bag', JSON.stringify(bagItems));
        dispatch(addProductInBag(addToBag))
    }

    console.log(product.description)

    return <div className={s.product_information}>
        <h1 className={s.product_name}>
            {product.name}
        </h1>
        <div className={s.product_price}>
            {product.price} ₴
        </div>
        <div className={s.size_guide}>
            SIZE GUIDE
        </div>
        <div className={s.choose_size_block}>
            <div className={s.list_sizes}>
                {product.sizes?.map((size, index) => (
                    <Size size={size} key={index} setSizeAddToBag={setSizeAddToBag}/>
                ))}
            </div>
            <div className={s.add_to_card_btn}
                 onClick={()=> { if (sizeAddToBag !== 'size') addProductToBag()} }
            >
                ADD TO CART [<i>{sizeAddToBag}</i>]
            </div>
        </div>
        <div className={s.description}>
            DESCRIPTION
        </div>
        <div className={s.product_description}>
            <OutputDescription description={product.description} name={product.name}/>
        </div>

        <GenerateDescription name={product.name} category={product.category} keyWords={product.description} img_url={product.header_image}/>

        <Link href={'/shop'} className={s.back_btn}>
            {'< '}BACK TO SHOP
        </Link>
    </div>
}

