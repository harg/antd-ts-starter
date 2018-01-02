import React from 'react';
import { Modal, Form, Input } from 'antd';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
const FormItem = Form.Item;

import { FormComponentProps } from 'antd/lib/form';

interface TodoCreateFormProps extends FormComponentProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: () => void;
}

export const TodoCreateForm = Form.create()((props: TodoCreateFormProps) => {
  const { visible, onCancel, onCreate, form } = props;
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title="Create a new todo"
      okText="Save"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <FormItem label="Task">
          {getFieldDecorator('task', {
            rules: [
              {
                required: true,
                message: 'This field is required'
              },
              {
                min: 3,
                message: 'Minimum lenth 3 char'
              }
            ]
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  );
});

// export class TodoCreateForm extends React.Component<TodoCreateFormProps, {}> {}
