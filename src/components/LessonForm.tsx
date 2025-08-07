import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Heading,
  Container,
} from '@chakra-ui/react'
import axios from 'axios'

const LessonForm = () => {
  const toast = useToast()
  const [form, setForm] = useState({
    nickname: '',
    event_experienced: '',
    describe_lesson_learned: '',
    inspirational_message_for_others: '',
    year_event_happened: '' // honeypot
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/lessons', form)

      if (res.data.success) {
        toast({ title: 'Submission received!', status: 'success' })
        setForm({
          nickname: '',
          event_experienced: '',
          describe_lesson_learned: '',
          inspirational_message_for_others: '',
          year_event_happened: ''
        })
      } else {
        toast({ title: 'Oops', description: res.data.message, status: 'error' })
      }
    } catch (err) {
      console.error(err)
      toast({ title: 'Error', description: 'Something went wrong.', status: 'error' })
    }
  }

  return (
    <Container
  maxW="960px"
  w="90%"
  mb={20}
  py={10}
  bg="#b1b1b131"
  borderRadius="20px"
  color="white"
  display="flex"
  justifyContent="center"
>
  <Box
    as="form"
    onSubmit={handleSubmit}
    w="100%"
    maxW="960px"
    borderWidth={1}
    borderRadius="10px"
    p={10}
    bg="none"
    shadow="md"
  >
    <Heading mb={8} textAlign="center">
      Share a Lesson Learned
    </Heading>

    <VStack spacing={6} w="100%">
  <FormControl isRequired w="100%">
    <FormLabel>Nickname</FormLabel>
    <Input
      name="nickname"
      value={form.nickname}
      onChange={handleChange}
      placeholder="ex: Anonymous123"
      minH="40px"
      w={"100%"}
    />
  </FormControl>

  <FormControl isRequired w="100%">
    <FormLabel>Event Experienced</FormLabel>
    <Textarea
      name="event_experienced"
      value={form.event_experienced}
      onChange={handleChange}
      placeholder="What happened?"
      minH="100px"
      w={"100%"}
    />
  </FormControl>

  <FormControl isRequired w="100%">
    <FormLabel>Describe Lesson Learned</FormLabel>
    <Textarea
      name="describe_lesson_learned"
      value={form.describe_lesson_learned}
      onChange={handleChange}
      placeholder="What insight did you gain?"
      minH="100px"
      w={"100%"}
    />
  </FormControl>

  <FormControl isRequired w="100%">
    <FormLabel>Inspirational Message for Others</FormLabel>
    <Textarea
      name="inspirational_message_for_others"
      value={form.inspirational_message_for_others}
      onChange={handleChange}
      placeholder="Encourage someone else..."
      minH="100px"
      w={"100%"}
    />
  </FormControl>


      {/* honeypot field (hidden) */}
      <Input
        display="none"
        type="number"
        name="year_event_happened"
        value={form.year_event_happened}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
      />

      <Button type="submit" colorScheme="teal" width="full" size="lg">
        Submit
      </Button>
    </VStack>
  </Box>
</Container>

  )
}

export default LessonForm
