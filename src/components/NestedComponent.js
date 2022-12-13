import React, { useContext } from "react";
import _ from "lodash";
import JsonDataContext from "../contexts/JsonDataContext";

const NestedComponent = ({ keyPath }) => {
    const {jsonData, setJsonData}=useContext(JsonDataContext);
    const onChange = (e) => {
        let value = e.target.value;
        let newJson = jsonData;
        newJson = _.set(newJson, keyPath, value);
        setJsonData(newJson);
    };

    return (
        <input
            defaultValue={_.get(jsonData, keyPath)}
            name={keyPath}
            onChange={onChange}
        />
    );
};

export default NestedComponent;
