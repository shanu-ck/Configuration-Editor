import React, { useContext } from "react";
import NestedComponent from "./NestedComponent";
import "./TreeComponent.css";
import JsonDataContext from "../contexts/JsonDataContext";

const TreeComponent = () => {
    const { jsonData } = useContext(JsonDataContext);
    const keyGen = (keyPath, key) => [...keyPath, key];

    const processObject = (object, keyPath) =>
        Object.keys(object).map((key, reactKey) => {
            let newKeyPath = keyGen(keyPath, key);
            return (
                <li key={reactKey + key}>
                    {buildNode(key)}
                    <ul className="nested">
                        {isPrimative(object[key])
                            ? buildLeaf(object[key], newKeyPath)
                            : isArray(object[key])
                            ? loopArray(object[key], newKeyPath)
                            : processObject(object[key], newKeyPath)}
                    </ul>
                </li>
            );
        });

    const loopArray = (array, keyPath) =>
        array.map((value, key) => {
            let newKeyPath = keyGen(keyPath, key);
            return (
                <div key={key + value}>
                    {buildNode(key)}
                    <ul className="nested">
                        {isPrimative(value)
                            ? buildLeaf(value, newKeyPath)
                            : isArray(value)
                            ? loopArray(value, newKeyPath)
                            : processObject(value, newKeyPath)}
                    </ul>
                </div>
            );
        });

    const isArray = (value) => Array.isArray(value);

    const isPrimative = (value) => {
        return (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        );
    };

    const buildNode = (key) => (
        <span
            className="node caret"
            onClick={(e) => {
                toggle(e);
            }}
        >
            {key}
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
