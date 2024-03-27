import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete, Grid, Typography } from "@mui/material";
import { textFieldStyles } from "../constants";
import ThreeDButton from "../components/Buttons/3dButton";
import "react-phone-input-2/lib/style.css";
import "../App.css";
import { getGlobalList, getGlobalTimeSlot } from "../api/api";

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 }
];

const QuestionModal = ({ isOpen, OnSuccess }) => {

    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    console.log("time", time)
    console.log("location", location)
    const [isDisable, setIsDisable] = useState(true);
    const [globalList, setGlobalList] = useState([]);
    const [globalTime, setGlobalTime] = useState([]);

    const handleChangeLocation = (event) => {
        console.log(event);
        const value = event.target.value;
        const selectedItem = globalList.find((item) => item.label === value);
        setLocation(selectedItem);
        getTime(selectedItem);
    };

    const handleTimeChange = (event) => {
        const value = event.target.value;
        const selectedItem = globalTime.find((item) => item.label === value);
        setTime(selectedItem);
        console.log("selected value", selectedItem);
    };

    const getList = async () => {
        const data = await getGlobalList()
        const { adminlist } = data;
        const options = adminlist.map((item) => ({
            label: item.location,
            storeId: item.StoreId,
            dateslot: item.dateslot,
        }));
        setGlobalList(options);
        getTime(options[0]);
    }

    const getTime = async (data) => {
        const { storeId, dateslot } = data
        const time = await getGlobalTimeSlot(storeId, dateslot)
        const { adminlist } = time;
        const options = adminlist.map((item) => ({
            label: item.exact_timeslot,
            timeslot: item.timeslot,
            dateslot: item.dateslot,
        }));
        console.log(options)
        setGlobalTime(options)

        console.log("time", time);
    }

    useEffect(() => {
        getList()
    }, [])

    useEffect(() => {
        if (location !== "" && time !== "") {
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }
    }, [location, time])


    return (
        <div>
            <Modal open={isOpen} disableBackdropClick={true}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "10%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "70%",
                        maxWidth: "350px",
                        maxHeight: "max-content",
                        overflowY: "visible",
                        bgcolor: "#ffffffed",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "10px",
                    }}
                >
                    <center>
                        <Typography
                            style={{
                                fontSize: "calc(1.2rem + 1.2vw)",
                                fontFamily: textFieldStyles.family,
                                marginBottom: "10px",
                            }}
                        >
                            Book a slot with your
                            <br />
                            Favorite Location
                        </Typography>
                    </center>

                    <Grid mb={2} mt={2}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={globalList}
                            onSelect={handleChangeLocation}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Date & Location *"
                                    value={location}
                                    onChange={handleChangeLocation}
                                    InputProps={{
                                        ...params.InputProps,
                                        style: {
                                            color: textFieldStyles.color,
                                            background: "white",
                                            border: "none",
                                            borderRadius: "10px",
                                            fontFamily: textFieldStyles.family,
                                        },
                                        inputProps: {
                                            ...params.inputProps,
                                            maxLength: 40,
                                            autoFocus: false,
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: textFieldStyles.color,
                                            fontFamily: textFieldStyles.family,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={globalTime}
                            onSelect={handleTimeChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Time *"
                                    value={time}
                                    onChange={handleTimeChange}
                                    InputProps={{
                                        ...params.InputProps,
                                        style: {
                                            color: textFieldStyles.color,
                                            background: "white",
                                            border: "none",
                                            borderRadius: "10px",
                                            fontFamily: textFieldStyles.family,
                                        },
                                        inputProps: {
                                            ...params.inputProps,
                                            maxLength: 40,
                                            autoFocus: false,
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: textFieldStyles.color,
                                            fontFamily: textFieldStyles.family,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <div
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        <center>
                            <ThreeDButton
                                name={"Proceed"}
                                onClick={() => OnSuccess(time?.label, time?.dateslot, location?.storeId)}
                                disabled={false}
                            />
                        </center>
                    </div>
                </Box>
            </Modal>

        </div >
    );
};

export default QuestionModal;
