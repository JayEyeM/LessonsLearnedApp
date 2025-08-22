import LessonForm from "./components/LessonForm";
import LessonsBoard from "./components/LessonsBoard";
import { Box } from "@chakra-ui/react";
import useWakeUpLessonsBackend from "./components/useWakeUpLessonsBackend";

function App() {
  useWakeUpLessonsBackend();
  return (
    <Box
      minH="100vh"
      minW="100vw"
      bg="#0a1f0aff"
      color="white"
      py={10}
      pb={80}
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <LessonForm />
      <LessonsBoard />
    </Box>
  );
}

export default App;
