import axios from 'axios';
import { useState } from 'react';
import styled from '@emotion/styled';

interface Product {
    name: string;
    price: string;
    reviewCount: string;
    url: string;
    imageUrl: string;
}

interface ResponseData {
    totalCount: number;
    products: Product[];
}

const Container = styled.div`
    padding: 20px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    input {
        margin-right: 10px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    button {
        padding: 5px 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
`;

const CardList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    margin-bottom: 20px;
`;

const Card = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;

    a {
        text-decoration: none;
        color: #333;
        display: block;
    }

    h2 {
        margin-top: 0;
        margin-bottom: 5px;
    }

    p {
        margin: 0;
    }

    img {
        max-width: 100%;
        height: auto;
        margin-top: 10px;
    }
`;

const ToggleBox = styled.div`
    display: flex;
    align-items: center;
`;

const ToggleLabel = styled.label`
    margin-right: 10px;
`;

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [isBigCardList, setIsBigCardList] = useState<boolean>(true);

    const fetchData = async (searchKeyword: string) => {
        setLoading(true);
        setProducts([]);
        setTotalCount(0);
        try {
            const response = await axios.get<ResponseData>(
                `${import.meta.env.VITE_API}${
                    import.meta.env.VITE_FIRST_PRODUCTS
                }`,
                {
                    params: {
                        keyword: searchKeyword,
                    },
                },
            );
            setProducts(response.data.products);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleButtonClick = () => {
        fetchData(keyword);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchData(keyword);
        }
    };

    const handleToggleChange = () => {
        setIsBigCardList((prevState) => !prevState);
    };

    return (
        <Container>
            <InputWrapper>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button type="button" onClick={handleButtonClick}>
                    Search
                </button>
            </InputWrapper>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h1>Total Count: {totalCount}</h1>

                    <ToggleBox>
                        <ToggleLabel htmlFor="toggle-card-size">
                            Card Size:
                        </ToggleLabel>
                        <input
                            type="checkbox"
                            id="toggle-card-size"
                            checked={isBigCardList}
                            onChange={handleToggleChange}
                        />
                        <label htmlFor="toggle-card-size">
                            {isBigCardList ? 'Big' : 'Small'}
                        </label>
                    </ToggleBox>

                    <CardList>
                        {products.map((product, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Card key={index}>
                                <a href={product.url} target="__blank">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.imageUrl}
                                    />
                                    <h2>Name: {product.name}</h2>
                                    <p>Price: {product.price}</p>
                                    <p>Review: {product.reviewCount}</p>
                                    <p>URL: {product.url}</p>
                                </a>
                            </Card>
                        ))}
                    </CardList>
                </>
            )}
        </Container>
    );
}
