import React, { useContext } from "react";
import NestedComponent from "./NestedComponent";
import "./TreeComponent.css";
import JsonDataContext from "../contexts/JsonDataContext";
import AddItemComponent from "./AddItemComponent";
import RemoveItemComponent from "./RemoveItemComponent";

const TreeComponent = () => {
    const { jsonData } = useContext(JsonDataContext);
    const keyGen = (keyPath, key) => [...keyPath, key];

    const processObject = (object, keyPath) => {
        return (
            <>
                {Object.keys(object).map((key, reactKey) => {
                    let newKeyPath = keyGen(keyPath, key);
                    return (
                        <li key={reactKey + key}>
                            {buildNode(key, newKeyPath)}
                            <ul className="nested">
                                {isPrimitive(object[key])
                                    ? buildLeaf(object[key], newKeyPath)
                                    : isArray(object[key])
                                    ? loopArray(object[key], newKeyPath)
                                    : processObject(object[key], newKeyPath)}
                            </ul>
                        </li>
                    );
                })}
                <li key="newKey" className="add-item">
                    {buildNode(<AddItemComponent keyPath={keyPath} />, keyPath)}
                </li>
            </>
        );
    };

    const loopArray = (array, keyPath) => {
        return (
            <>
                {array.map((value, key) => {
                    let newKeyPath = keyGen(keyPath, key);
                    return (
                        <div key={key + value}>
                            {buildNode(key, newKeyPath)}
                            <ul className="nested">
                                {isPrimitive(value)
                                    ? buildLeaf(value, newKeyPath)
                                    : isArray(value)
                                    ? loopArray(value, newKeyPath)
                                    : processObject(value, newKeyPath)}
                            </ul>
                        </div>
                    );
                })}
                <li key="newKey" className="add-item">
                    {buildNode(<AddItemComponent keyPath={keyPath} />, keyPath)}
                </li>
            </>
        );
    };

    const isArray = (value) => Array.isArray(value);

    const isPrimitive = (value) => {
        return (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        );
    };

    const buildNode = (key, keyPath) => (
        <span
            className="node caret"
            onClick={(e) => {
                toggle(e);
            }}
        >
            {key}
            <RemoveItemComponent keyPath={keyPath} />
        </span>
    );

    const buildLeaf = (value, keyPath) => (
        // <li className="leaf" onClick={(e) => {}}>
        <NestedComponent keyPath={keyPath} />
        // </li>
    );

    const toggle = (event) => {
        event.target.parentElement
            .querySelector(".nested")
            .classList.toggle("active");
        event.target.classList.toggle("node-down");
        event.target.classList.toggle("caret-down");
    };

    return (
        <>
            <ul id="myUL">{processObject(jsonData, [])}</ul>
        </>
    );
};

export default TreeComponent;
