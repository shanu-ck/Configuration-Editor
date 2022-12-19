import React, { useContext } from "react";
import _ from "lodash";
import JsonDataContext from "../contexts/JsonDataContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddItemComponent = ({ keyPath }) => {
    const { jsonData, setJsonData } = useContext(JsonDataContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        let key = e.target.key.value;
        let value = e.target.valueData.value;
        keyPath.push(key);
        let newJson = { ...jsonData };
        newJson = _.set(newJson, keyPath, formatData(value));
        setJsonData(newJson);
        e.target.reset();
    };

    const formatData = (data) => {
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    };

    return (
        <ul className="nested">
            <li>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Control placeholder="Key" name="key" />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="Value"
                                name="valueData"
                            />
                        </Col>
                        <Col>
                            <Button type="submit"> Add </Button>
                        </Col>
                    </Row>
                </Form>
            </li>
        </ul>
    );
};

export default AddItemComponent;
