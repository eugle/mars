import React from "react";
import {useQuery, gql} from "@apollo/client";
import {Helmet} from "react-helmet-async";
import {Div} from '@eugle/oneui';

const GET_BASIC = gql`
    {
        basic: getBasic {
            title
            content
        }
    }
`;

const Home = () => {
    const {loading, error, data} = useQuery(GET_BASIC);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error ⁉️</p>;

    const {title, content} = data?.basic || {};

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={content}/>
            </Helmet>

            <Div mt={15} p={15} r={3} b={[1, 's', 'f9']}>
                <Div fs={18} lh={38} c='p'>{title}</Div>
                <Div>{content}</Div>
            </Div>
        </>
    );
};

export default Home;
