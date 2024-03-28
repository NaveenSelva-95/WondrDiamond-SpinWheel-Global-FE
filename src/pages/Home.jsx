import {
  Stack,
  IconButton,
  Snackbar,
  SnackbarContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CustomModal from "../modals/Form";
import { useEffect, useState } from "react";
import OTPModal from "../components/OTP/OTPModal";
import Confetti from "react-confetti";
import FinalModal from "../modals/final";
import ExistsModal from "../modals/Exists";
import { textFieldStyles } from "../constants";
import { checkBranch, createUser, getSpinData, getVoucher, sendMessage } from "../api/api";
import "../components/Buttons/ThreeDButton.css";
import ErrorModal from "../modals/Error";
import SpinError from "../modals/SpinError";
import WheelSpinner from "../components/Wheel4";
import Header from "../layouts/header";
import QuestionModal from "../modals/Question";
import LostError from "../modals/LostError";

const Home = () => {
  const theme = useTheme();
  const [timeoutId, setTimeoutId] = useState(null); //spin not stopping handle .
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [startSpin, setStartSpin] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [isFinalModalOpen, setFinalModalOpen] = useState(false);
  const [isExistsModalOpen, setExistsModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [isSpinErrorOpen, setSpinErrorOpen] = useState(false);

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionPageLoading, setQuestionPageLoading] = useState(false);

  // useEffect(() => {
  //   if (!isQuestionModalOpen) {
  //     setTimeout(() => {
  //       setStartSpin(true)
  //     }, 2000)
  //   }
  // }, [isQuestionModalOpen])

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [open, setOpen] = useState(false);
  const [voucherNames, setVoucherNames] = useState(null);
  const [win, setWin] = useState(0);
  // const [secondarywin, setSecondaryWin] = useState(300);
  const [voucherCode, setVoucherCode] = useState(null);
  const [voucherImage, setVoucherImage] = useState(null);
  const [isSpinAgain, setIsSpinAgain] = useState(false);
  const [spinAgain, setSpinAgain] = useState(false);
  const [secondSpinCompleted, setSecondSpinCompleted] = useState(false);
  const [height, setHeight] = useState("90svh");
  const deviceWidth = window.innerWidth - 30;
  const deviceHeight = window.innerHeight;

  console.log(isSpinAgain);
  console.log(spinAgain);

  function triggerModal() {
    if (isSpinAgain) {
      if (!spinAgain) {
        openModal();
      } else {
        setStartSpin(true);
      }
      // setSpinAgain(true)
    } else {
      openModal();
    }
  }

  const handleClose = () => {
    setOpen(false);
  };


  let fullName = "triggerModal";
  let mobileNumber = "999000990";
  function getSegmentValue(value) {
    switch (value) {
      case "Spin Again":
        return 300;
      case "Get a free diamond pendent":
        return 60;
      case "Flat $50 off":
        return 120;
      case "Flat 10% off":
        return 240;
      case "Flat 5% off":
        return 180;
      case "$100 Gift Voucher":
        return 0;
      default:
        return -1; // Return -1 if the value doesn't match any segment
    }
  }

  useEffect(() => {
    function generateTrueRandomly() {
      return Math.random() < (1 / 5);
    }
    function handleClick() {
      // setIsSpinAgain(generateTrueRandomly())
      console.log("isSpin", generateTrueRandomly());
    }
    handleClick()
  }, []);

  const handleOpenQuestion = () => {
    setOtpModalOpen(false);
    setIsQuestionModalOpen(true);
  }

  useEffect(() => {
    setTimeout(() => {
      setWin(180);


      setStartSpin(true)
    }, 9000)
  }, [])
  async function handleNextButtonClick(data) {

    setIsQuestionModalOpen(true)
    if (data) {
      let win1 = await getSegmentValue(data.VoucherListName);
      if (isSpinAgain) {
        setWin(60);
        setSecondaryWin(win1)
      } else {
        setWin(win1);
      }
      console.log("image", data.VoucherImageURL);
      setVoucherImage(data.VoucherImageURL);
      setVoucherCode(data.VoucherCode);
    }
    setHideButton(true);
    setOpen(true);
    setOtpModalOpen(false);
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const onCorrectAnswer = async (timeslot, dateslot, storeId) => {
    setQuestionPageLoading(true);
    const data = localStorage.getItem("userData");
    const storedData = JSON.parse(data);
    const { Name, Email, Mobile } = storedData;
    console.log("storedData", storedData);

    const req = {
      Mobile: Mobile,
      Email: Email,
      Name: Name,
      StoreId: storeId,
      Dateslot: dateslot,
      TimeSlot: timeslot,
    };

    if (storedData) {
      const user = await createUser(req);
      console.log(user);


      const customerKey = localStorage.getItem("Key1");
      const voucher = await getVoucher(customerKey);
      if (voucher?.Status === 1) {
        handleNextButtonClick(voucher?.Voucher); //##static
        // setLoading(false);
      }

      setQuestionPageLoading(false);
      setIsQuestionModalOpen(false);
      setStartSpin(true);


      // setTimeout(() => {
      // alert("rotate")
      // }, 2000)
    }
  }

  const OpenQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const closeQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const closeOTPModal = () => {
    setOtpModalOpen(false);
  };

  const exportUserData = (res) => {
    console.log("Received User Data:", res);
    closeModal();
    if (res.Status == true) {
      setOtpModalOpen(true);
    } else {
      let data = res?.Msg.slice(0, 5);
      if (data === "Email") {
        setInput1("Email Address");
        setInput2("Email");
      } else {
        setInput1("Mobile Number");
        setInput2("number");
      }
      setExistsModalOpen(true);
    }
  };

  async function triggerMessage() {
    const Key1 = localStorage.getItem("Key");
    console.log(Key1);
    let req = {
      Key: Key1,
    };

    let res = await sendMessage(req);
    // console.log(res);
    setVoucherImage(res.img)
  }

  console.log("isSpin", isSpinAgain)
  function completed() {
    // setStartSpin(false);
    // setStartSpin(true)

    if (timeoutId) {
      console.log(timeoutId);
      clearTimeout(timeoutId);
    }
    // let status = localStorage.getItem("stopped");
    console.log(status);
    // if (status != "stop") {


    // setWin(180);
    // setStartSpin(true)

    setShowConfetti(true);
    triggerMessage();
    setTimeout(() => {
      setFinalModalOpen(true);
    }, 3500);

    // }
  }

  function handleClick() {
    setExistsModalOpen(false);
    setModalOpen(true);
  }

  function handleSpinStopClick() {
    localStorage.clear();
    window.location.reload();
  }

  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Vivo")) {
      setHeight("90vh");
    }
    if (userAgent.includes("Chrome")) {
      const chromeVersion = userAgent.match(/Chrome\/(\d+\.\d+)/);
      if (chromeVersion) {
        const version = chromeVersion[1];
        if (version < 108) {
          setHeight("90vh");
        }
      }
    }
  };
  useEffect(() => {
    detectBrowser();
  }, []);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const branch = searchParams.get("BranchID") || "";
  //   console.log(branch);

  //   async function isBranch() {
  //     let req = {
  //       Key: branch,
  //     };
  //     const res = await checkBranch(req);
  //     // console.log(res);
  //     if (res.Status == 0) {
  //       localStorage.setItem("Branch", branch);
  //     } else if (res.Status == 1) {
  //       setErrorModalOpen(true);
  //       // alert("Branch code is Invalid, please scan again.");
  //     }
  //   }

  //   async function fetchData() {
  //     let res = await getSpinData();
  //     const namesArray = res.VoucherList.map(
  //       (voucher) => voucher.VoucherListName
  //     );
  //     setVoucherNames(namesArray);
  //     console.log(namesArray);
  //   }
  //   fetchData();
  //   if (branch != "") {
  //     isBranch();
  //   } else {
  //     setErrorModalOpen(true);
  //   }
  //   localStorage.setItem("stopped", "no");
  // }, []);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Define justifyContent based on screen size
  const justifyContent = isSmallScreen ? "flex-start" : "center";
  const paddingTop = isSmallScreen ? "1rem" : "0";

  return (
    <Stack
      justifyContent={justifyContent}
      alignContent="center"
      alignItems="center"
      style={{
        height: deviceHeight > 650 ? height : "",
        width: "100vw",
        paddingTop: paddingTop,
      }}
    >
      <Header />

      <div
        style={{
          marginTop: "7%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="/PNG/spin.png" height="auto" width="80%" alt="play logo" />
      </div>
      <img
        src="./cropped-Logo.png"
        style={{ height: "1px", opacity: "0", width: "1px" }}
      ></img>

      {!voucherNames && (
        <>
          <div style={{ marginTop: "5%", marginBottom: "7%" }}>
            {/* <SpinWheel
              start={startSpin}
              data={voucherNames}
              completed={completed}
              win={win}
            /> */}
            <WheelSpinner
              imageUrl={"/wheel.png"}
              completed={completed}
              winner={win}
              Start={startSpin}
              Initiate={triggerModal}
            />
          </div>

          {/* {!hideButton && (
            <div>
              <ThreeDButton
                name={"Spin!"}
                onClick={() => {
                  triggerModal();
                }}
              />
            </div>
          )} */}
        </>
      )}

      <OTPModal
        isOpen={otpModalOpen}
        // onClose={() => handleNextButtonClick()}
        handleOpenQuestion={handleOpenQuestion}
        name={fullName}
        number={mobileNumber}
      // Pass the function as a prop
      />

      <CustomModal isOpen={isModalOpen} onExport={exportUserData} />
      <QuestionModal isOpen={isQuestionModalOpen} OnSuccess={onCorrectAnswer} questionPageLoading={questionPageLoading} />
      <FinalModal
        isOpen={isFinalModalOpen}
        onClose={closeOTPModal}
        handleReload={handleSpinStopClick}
        image={voucherImage}
        code={voucherCode}
        name={win}
      />
      <ExistsModal
        isOpen={isExistsModalOpen}
        input1={input1}
        input2={input2}
        onClick={handleClick}
      />

      <SpinError isOpen={isSpinErrorOpen} onClick={handleSpinStopClick} />
      <ErrorModal isOpen={isErrorModalOpen} />
      {showConfetti && (
        <div
          style={{
            width: deviceWidth,
            height: deviceHeight + 50,
            position: "absolute",
          }}
        >
          <Confetti width={deviceWidth} height={deviceHeight} />
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        style={{
          bottom: "100px",
        }}
        open={open}
        autoHideDuration={3500} // Adjust the duration as needed (in milliseconds)
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            background: "#3a3a3c",
            color: "white",
            fontSize: "1.2rem",
            fontFamily: textFieldStyles.family,
          }}
          message="User validated!"
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                style={{
                  background: "white",
                  borderRadius: "5px",
                  padding: 0,
                  color: "black",
                }}
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      </Snackbar>
    </Stack>
  );
};

export default Home;
