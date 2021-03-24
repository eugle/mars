import React from "react";
import {useQuery, gql} from "@apollo/client";
import {Helmet} from "react-helmet-async";
import {Div} from '@eugle/oneui';

const GET_BASIC = gql`
    query GetBasic($host:String) {
        basic: getBasic(host:$host) {
            title
            content
        }
    }
`;

const Home = ({host}) => {

    const {data} = useQuery(GET_BASIC,{variables: {host}});
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
