import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import { textFieldStyles } from "../constants";
import ThreeDButton from "../components/Buttons/3dButton";
const LostError = ({ isOpen, onClick, input1, input2 }) => {
    return (
        <div>
            <Modal open={isOpen} disablebackdropclick="true">
                <Box
                    sx={{
                        position: "absolute",
                        top: "10%", // Adjust the top value
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "70%", // Set the width as desired
                        maxWidth: "400px", // Set the max width as desired
                        // Set the max height to 40% of the viewport height

                        maxHeight: "50vh", // Set the max height to 40% of the viewport height
                        overflowY: "auto", // Add overflowY for scrolling if needed
                        bgcolor: "#ffffffed",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "10px",
                    }}
                >
                    <center>
                        <img
                            src="/warn.png"
                            alt="voucher"
                            style={{ marginTop: "10px", marginBottom: "10px" }}
                        />
                    </center>
                    <Grid xs={12}>
                        <center>
                            <Typography
                                style={{
                                    fontSize: "1rem",
                                    fontFamily: textFieldStyles.family,
                                    marginBottom: "10px",
                                }}
                            >
                                We're sorry, but you've reached the maximum number of attempts allowed.
                                <br />Thank you for your participation!
                            </Typography>
                        </center>
                    </Grid>
                    {/* <div
                        style={{
                            marginTop: "10px",
                        }}
                    >
                        <center>
                            <ThreeDButton name={"Try Now!"} onClick={onClick} />
                        </center>
                    </div> */}
                </Box>
            </Modal>
        </div>
    );
};

export default LostError;
