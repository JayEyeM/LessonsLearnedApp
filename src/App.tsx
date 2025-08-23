import LessonForm from "./components/LessonForm";
import LessonsBoard from "./components/LessonsBoard";
import { Box, Text, Heading, Link } from "@chakra-ui/react";
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
      <Heading
        as="h1"
        size="2xl"
        mb={6}
        textAlign="center"
        color="orange"
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)"
      >
        Lessons Learned Board
      </Heading>
      <Text mb={10} fontSize="xl" textAlign="center" maxW="800px">
        A place to share and learn from experiences. Submit your lessons below
        and see what others have learned!
      </Text>
      <LessonForm />
      <LessonsBoard />
      <Box
        id="footer"
        w="90%"
        mx="auto"
        minH="120px"
        mt={40}
        mb={10}
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg={"#1d0238ff"}
        color={"white"}
        borderRadius="20px"
        p={10}
      >
        <Text mb={4} fontSize="2xl">
          © {new Date().getFullYear()}{" "}
          <Link
            href="https://github.com/JayEyeM"
            isExternal
            color="#90cdf4"
            textDecoration="underline"
          >
            github.com/JayEyeM
          </Link>{" "}
          All rights reserved. -- Built with ❤️ using React, Chakra UI, Supabase
          and Render.com
        </Text>
      </Box>
    </Box>
  );
}

export default App;
