import React, { createRef, useContext } from "react";
import Pdf from "react-to-pdf";
import AppContext from "../AppContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    buttonBuildNew: {
        cursor: "pointer",
        minWidth: "7rem",
        textAlign: "center",
        border: "none",
        padding: "1rem",
        boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%), 0 1px 2px 0 rgb(0 0 0 / 19%)",
        background: "#e8ecff",
        "&:hover": {
            background: "#b6bce2",
        },
    },
    buttonDownload: {
        cursor: "pointer",
        minWidth: "7rem",
        textAlign: "center",
        border: "none",
        padding: "1rem",
        boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%), 0 1px 2px 0 rgb(0 0 0 / 19%)",
        background: "#f5d7e3",
        "&:hover": {
            background: "#e6b3c7",
        },
    },
    resume: {
        padding: "3rem",
        boxShadow: "0 0.5rem 1rem 0 rgb(0 0 0 / 10%)",
        margin: "1rem",
        marginTop: "3rem",
        marginBottom: "1rem",
    },
}));

let refreshPage = () => {
    window.location.reload();
};

function Resume() {
    const ref = createRef();
    const value = useContext(AppContext);
    const classes = useStyles();

    let { answers } = value.state;
    return (
        <div>
            <div ref={ref} className={classes.resume}>
                {answers.map((answer) => {
                    return (
                        <div>
                            {answer.resumeFieldId === "name" ||
                            answer.resumeFieldId === "email" ||
                            answer.resumeFieldId === "address" ||
                            answer.resumeFieldId === "phoneNumber" ? (
                                <div
                                    style={{
                                        textAlign: "right",
                                    }}
                                >
                                    <label>{ answer.answer }</label>
                                </div>
                            ) : (
                                <div>
                                    <h4>{ answer.resumeField }</h4>
                                    <p>{ answer.answer }</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <button className={classes.buttonBuildNew} onClick={refreshPage}>
                    Build New
                </button>
                <Pdf targetRef={ref} filename="resume.pdf">
                    {({ toPdf }) => (
                        <button onClick={toPdf} className={classes.buttonDownload}>
                            Download Resume
                        </button>
                    )}
                </Pdf>
            </div>
        </div>
    );
};

export default Resume;