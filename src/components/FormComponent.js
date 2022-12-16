import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import TreeComponent from "./TreeComponent";
import JsonDataContext from "../contexts/JsonDataContext";

export default function FormComponent() {
    const [jsonData, setJsonData] = useState();
    const [filename, setFilename] = useState("filename");

    const showFile = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            setJsonData(JSON.parse(text));
        };
        reader.readAsText(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const downloadFile = ({ data, fileName, fileType }) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType });
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement("a");
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
    };

    const exportToJson = (e) => {
        e.preventDefault();
        downloadFile({
            data: JSON.stringify(jsonData),
            fileName: filename,
            fileType: "text/json",
        });
    };

    return (
        <JsonDataContext.Provider value={{ jsonData, setJsonData }}>
            <Container style={{ marginTop: 20 }}>
                <Card>
                    <Card.Header className="text-center">
                        Configuration Editor
                    </Card.Header>
                    <Card.Body>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select configuration file</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => showFile(e)}
                            />
                        </Form.Group>
                        {jsonData && (
                            <>
                                <Card.Title>File Content</Card.Title>
                                <TreeComponent />
                                <div className="text-center mt-5">
                                    <Button
                                        variant="primary"
                                        onClick={exportToJson}
                                    >
                                        Download
                                    </Button>
                                </div>
                            </>
                        )}
                    </Card.Body>
                    <Card.Footer className="text-muted text-center">
                        Developed by @Shanu-CK and @Saikat-CK
                    </Card.Footer>
                </Card>
            </Container>
        </JsonDataContext.Provider>
    );
}
