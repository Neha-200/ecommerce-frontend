import { useState } from "react"
import ProductCard from "../components/product-card";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";


const Search = () => {

  const {data:categoriesResponse, isLoading: loadingCategories, isError, error }
   = useCategoriesQuery("");

  const [search,setSearch] = useState("");
  const [sort,setSort] = useState("");
  const [maxPrice,setMaxPrice] = useState(10000);
  const [category,setCategory] = useState("");
  const [page,setPage] = useState(1);

  const {isLoading:productLoading, data:searchData, isError:productIsError, error: productError} = 
  useSearchProductsQuery({search,sort,category,page,price:maxPrice});

  const dispatch = useDispatch();

  const addToCardHandler = (cartItem:CartItem) => { 
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if( isError ) toast.error((error as CustomError).data.message);

  if( productIsError ) toast.error(
    (productError as CustomError).data.message);

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">none</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input type="range" min={100} max={1000000}
          value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}/> 
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">ALL</option>
            {!loadingCategories && categoriesResponse?.categories.map((i) => (
              <option value={i} key={i}>{i.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search by name"
        value={search} onChange={(e) => setSearch(e.target.value)}/>

        {
          productLoading ? <Skeleton length={10}/> : <div className="search-product-list">
          {searchData ?.products.map((i) => (
            <ProductCard key={i._id} productId={i._id} 
            name={i.name} price={i.price} stock={i.stock}
            handler={addToCardHandler} 
            photo={i.photo}/>
          ))}
        </div>
        }

        {searchData && searchData.totalPage > 1 && <article>
          <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev-1)}>Prev</button>
          <span>{page} of {searchData.totalPage}</span>
          <button disabled={!isNextPage} onClick={() => setPage((prev) => prev+1)}>Next</button>
        </article>}
      </main>
    </div>
  )
}

export default Search