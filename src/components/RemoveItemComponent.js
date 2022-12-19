import React, { useContext } from "react";
import _ from "lodash";
import JsonDataContext from "../contexts/JsonDataContext";
import CloseButton from "react-bootstrap/CloseButton";

const RemoveItemComponent = ({ keyPath }) => {
    const { jsonData, setJsonData } = useContext(JsonDataContext);
    const handleRemoveItem = () => {
        let newJson = { ...jsonData };
        console.log("KeyPath", keyPath);
        _.unset(newJson, keyPath);
        setJsonData(newJson);
    };

    return <CloseButton className="removeItem" onClick={handleRemoveItem} />;
};

export default RemoveItemComponent;
