import s from "./generate_description.module.scss";
import { useState } from "react";

export const GenerateDescription = ({ keyWords, img_url, category, name }) => {
    const [description, setDescription] = useState('');

    const generateText = () => {
        return 'Please create an SEO description for this product, considering its name: ' + name + ', ' +
            'category: ' + category + ', photo, and the following key phrases: ' + keyWords +
            '. Please include features, benefits, and any other important information for maximum optimization for search engines. 40-70 words'
    }

    const text = generateText();

    const getDescription = () => {
        fetch("/api/generate_post_description", {
            body: JSON.stringify({
                img_url: img_url,
                text: text,
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            return res.json();
        }).then(data => {
           console.log(data);
           setDescription(data.choices[0].message.content)
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    };

    return (
        <>
            <div className={s.btn_for_generate_description} onClick={getDescription}>
                generate full description
            </div>

            {description ? description : ''}
        </>
    );
};


