import FormContainer from '@/components/layout/page-containers/form-container';
import ScreenMd from '@/components/layout/page-containers/screen-md';
import { FancyMultiSelect } from '@/components/ui-blocks/fancy-multi-select/fancy-multi-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

type FormFields = {
  title: string;
  description: string;
  tags: Framework[];
};
type Framework = {
  value: string;
  label: string;
};
const sendQuestion = (data: FormFields) => {
  return Promise.resolve(data);
};

const CreateQuestionPage = () => {
  const { mutate: handleSendForm } = useMutation({
    mutationFn: sendQuestion,
    onSuccess: (data) => {
      console.log('Question submitted successfully', data);
    },
    onError: (error) => {
      console.error('Error submitting question', error);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
    },
  });

  const title = register('title', {
    required: 'Title should not be empty',
  });
  const description = register('description', {
    required: 'Description should not be empty',
  });

  return (
    <ScreenMd>
      <div className='my-4'>
        <h1 className='text-2xl font-bold'>Add Question</h1>
      </div>
      <FormContainer
        onSubmit={handleSubmit((data) => {
          console.log('Form Submitted:', data);
          handleSendForm(data);
        })}
      >
        <div>
          <Label htmlFor='title'>Title</Label>
          <Input {...title} id='title' />
          <p className='text-red-500'>{errors.description?.message}</p>
        </div>
        <div>
          <Label htmlFor='description'>Description</Label>
          <Textarea {...description} id='description' />
          <p className='text-red-500'>{errors.description?.message}</p>
        </div>
        <div>
          <Label htmlFor='tags'>Tags</Label>

          <FancyMultiSelect />
        </div>

        <Button>Add question</Button>
      </FormContainer>
    </ScreenMd>
  );
};

export default CreateQuestionPage;
