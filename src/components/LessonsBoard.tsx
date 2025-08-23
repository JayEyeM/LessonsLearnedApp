import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  Button,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_API_URL } from "./api";

interface Lesson {
  id: number;
  nickname: string;
  event_experienced: string;
  describe_lesson_learned: string;
  inspirational_message_for_others: string;
  post_created_date: string;
}

const LessonsBoard = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLessonId, setExpandedLessonId] = useState<number | null>(null);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_API_URL}/lessons`);
      if (res.data.success) {
        setLessons(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={20} color="whiteAlpha.800" fontSize="xl">
        <Spinner
          size="xxl"
          thickness="14px"
          speed="0.65s"
          color="orange"
          mb={4}
        />
        Loading lessons...
      </Box>
    );
  }

  return (
    <>
      <Button
        colorScheme="teal"
        backgroundColor={"#1d0238ff"}
        color="orange"
        size="xl"
        boxShadow={"0 0 10px rgba(0, 0, 0, 1)"}
        onClick={fetchLessons}
        variant="outline"
        mb={4}
        _hover={{
          bg: "#1d0238ff",
          color: "orange.200",
          boxShadow: "0 0 10px rgba(227, 151, 255, 1)",
        }}
        _active={{ bg: "#1d0238ff", color: "orange.300" }}
      >
        Refresh Board
      </Button>
      <Text mb={4} fontSize="2xl">
        Press the "Refresh Board" button to see your lesson appear here!
      </Text>
      <Box
        w="90%"
        maxW="960px"
        mx="auto"
        mb={60}
        bgColor="#1d023858"
        borderRadius="20px"
        p={20}
        m={10}
        color="white"
        maxH={"660px"}
        overflowY="auto"
      >
        <Text
          mb={4}
          fontSize="2xl"
          m="auto"
          textAlign="center"
          color={"orange"}
        >
          Click on any of the lesson cards to expand them!
        </Text>
        <SimpleGrid
          spacing={6}
          templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        >
          {lessons.map((lesson) => {
            const isExpanded = expandedLessonId === lesson.id;
            return (
              <Box
                key={lesson.id}
                borderWidth="1px"
                borderRadius="10px"
                p={4}
                mt={isExpanded ? 60 : 2}
                mb={isExpanded ? 60 : 2}
                bg="#1d0238ff"
                color="white"
                cursor="pointer"
                gridColumn={isExpanded ? "1 / -1" : "auto"}
                onClick={() => !isExpanded && setExpandedLessonId(lesson.id)}
                position="relative"
                boxShadow={
                  isExpanded
                    ? "0 0 10px 50px rgba(0, 0, 0, 1)"
                    : "0 0 10px rgba(0, 0, 0, 1)"
                }
              >
                {isExpanded && (
                  <IconButton
                    icon={<CloseIcon />}
                    aria-label="Close"
                    size="sm"
                    colorScheme="red"
                    position="absolute"
                    top={12}
                    right={12}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedLessonId(null);
                    }}
                  />
                )}

                <Box display="flex" flexDirection="row" gap={8} mb={2}>
                  <Text fontSize="md" color="#ffffffff" mb={2}>
                    Nickname:
                  </Text>
                  <Heading as="h4" color="orange" size="md" mb={1}>
                    {lesson.nickname}
                  </Heading>
                </Box>

                <Box display="flex" flexDirection="row" gap={8} mb={2}>
                  <Text fontSize="0.75rem" color="#ffffffff" mb={2}>
                    Date Posted:
                  </Text>
                  <Text fontSize="0.75rem" color="gray" mb={2}>
                    {new Date(lesson.post_created_date).toLocaleDateString()}
                  </Text>
                </Box>

                <Box
                  overflowY={isExpanded ? "visible" : "auto"}
                  height={isExpanded ? "auto" : "180px"}
                >
                  <Text fontWeight="bold" color="#4eb6cbff">
                    Event:
                  </Text>
                  <Text mb={2}>{lesson.event_experienced}</Text>

                  <Text fontWeight="bold" color="#4eb6cbff">
                    Lesson:
                  </Text>
                  <Text mb={2}>{lesson.describe_lesson_learned}</Text>

                  <Text fontWeight="bold" color="#4eb6cbff">
                    Message:
                  </Text>
                  <Text>{lesson.inspirational_message_for_others}</Text>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default LessonsBoard;
