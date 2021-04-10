// @flow

import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import { CodeBlock } from '@atlaskit/code';
import { DateTimePicker } from '@atlaskit/datetime-picker';
import { Label } from '@atlaskit/field-base';
import RadioGroup, { AkRadio } from '@atlaskit/field-radio-group';
import Form, { CheckboxField, Field } from '@atlaskit/form';
import ModalDialog, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog';
import Panel from '@atlaskit/panel';
import SectionMessage from '@atlaskit/section-message';
import { SimpleTag as Tag } from '@atlaskit/tag';
import TextArea from '@atlaskit/textarea';
import Textfield from '@atlaskit/textfield';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { taskCreated } from '../../list-of-tasks/actions';


type Props = {

    /**
     * Redux dispatch.
     */
    dispatch: Dispatch<*>;

    onCloseForm: Function;
}


let timeToDo = null;
const dateTimeFormat = 'YYYY/MM/DD';
const timeFormat = 'HH:mm';

/**
 * CreateTaskForm component.
 */
class CreateTaskForm extends Component<Props, State> {

    /**
     * Initializes a new {@code CreateTaskForm} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            jsonParseError: false
        };
        this._onFormSubmit = this._onFormSubmit.bind(this);
        this.onChangeDataTime = this.onChangeDataTime.bind(this);
        this._onJsonFileAttach = this._onJsonFileAttach.bind(this);
        this.fileInput = React.createRef();

        this.exampleJsonFile = `{
    "tasks": [
        {
            "title": "Some name",
            "description": "Some description",
            "timeToDo": "2021-04-10 12:00"
        },
        {
            "title": "Task with title only"
        },
    ]
}`;
    }


    /**
     * Prevents submission of the form.
     *
     * @param {Object} event - Event by which this function is called.
     * @returns {void}
     */
    _onFormSubmit(data: Object) {
        const date = new Date(timeToDo);

        const task = {
            title: data.title,
            description: data.description,
            timeToDo: moment(date, 'YYYY-MM-DD hh:mm').format('YYYY-MM-DD hh:mm'),
            tags: null,
            startTime: moment(new Date(), 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'),
            endTime: null,
            isDone: false
        };

        this.props.dispatch(taskCreated(task));
        this.props.onCloseForm();
    }

    /**
     * Keeps data input value and timeToDo in sync.
     *
     * @param {string} value
     * @returns {void}
     */
    onChangeDataTime(value: string) {
        timeToDo = value;
    }

    /**
     * Function fo getting data from json file
     * @param {Object} event - Some description(FIX).
     * @returns {void}
     */
    async _onJsonFileAttach(event) {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        const text = await file.text();

        console.log(text);

        try {
            const parsedText = JSON.parse(text);

            console.log(parsedText);
            this.setState({
                jsonParseError: false
            });

            parsedText.tasks.forEach(task => {
                if (task.title) {
                    const formedTask = {
                        title: task.title,
                        description: task.description,
                        timeToDo: task.timeToDo,
                        tags: null,
                        startTime: moment(new Date(), 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'),
                        endTime: null,
                        isDone: false
                    };

                    this.props.dispatch(taskCreated(formedTask));
                }
            });
            this.props.onCloseForm();
        } catch (e) {
            this.setState({
                jsonParseError: true
            });
        }
    }

    /**
     * Render function of component.
     *
     * @returns {ReactElement}
     */
    render() {
        const footer = (props: FooterProps) => (
            <ModalFooter showKeyline={props.showKeyline}>
                <div style={{ display: 'flex',
                    flex: 1,
                    justifyContent: 'flex-end' }}>
                    <div style={{ marginLeft: '10px' }}>
                        <Button onClick={this.props.onCloseForm}>
                            Закрыть
                        </Button>
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                        <Button appearance="primary" onClick={() => this.fileInput.current.click()}>
                            Загрузить из файла
                        </Button>
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                        <Button appearance="primary" type="submit">
                            Создать задачу
                        </Button>
                    </div>
                </div>
            </ModalFooter>
        );

    interface ContainerProps {
      children: React.ReactNode;
      className?: string;
    }

    return (
        <ModalTransition>
            <ModalDialog
                heading="Создать задачу"
                onClose={this.props.onCloseForm}
                components={{
                    Container: ({ children, className }: ContainerProps) => (
                        <Form onSubmit={this._onFormSubmit}>
                            {({ formProps }) => (
                                <form {...formProps} className={className}>
                                    {children}
                                </form>
                            )}
                        </Form>
                    ),
                    Footer: footer
                }}
            >
                {this.state.jsonParseError && <SectionMessage
                    title="Некорректный json-файл"
                    appearance="error"
                >
                    <p>Исправьте json-файл и попробуйте снова.</p>
                </SectionMessage>}
                <Field
                    label="Название"
                    name="title"
                    defaultValue=""
                    placeholder="Название задачи"
                    isRequired>
                    {({ fieldProps }) => <Textfield {...fieldProps} />}
                </Field>
                <Field label="Описание" name="description" defaultValue="" placeholder="Описание задачи">
                    {({ fieldProps }) => <TextArea {...fieldProps} />}
                </Field>
                <Field label="Срок" name="timeToDo" id="datetimepicker-1">
                    {({ fieldProps }) => <DateTimePicker
                        onChange={this.onChangeDataTime}
                    /> }
                </Field>
                <Panel header={<span> Как загрузить сразу несколько задач? </span>}>
                    <p style={{ margin: '5px' }}>
                        { 'Вы можете загрузить сразу несколько задач из '
                 + 'json файла. Для этого нажмите кнопку "Загрузить из файла" '
                  + 'и прикрепите json-файл в следующем формате:' }</p>
                    <CodeBlock
                        language="javascript"
                        showLineNumbers={false}
                        text={this.exampleJsonFile}
                    />
                    <input
                        accept = 'application/JSON'
                        onChange = { this._onJsonFileAttach }
                        ref = { this.fileInput }
                        style = {{ display: 'none' }}
                        type = 'file' />
                </Panel>
            </ModalDialog>
        </ModalTransition>
    );
    }
}

export default connect()(CreateTaskForm);
