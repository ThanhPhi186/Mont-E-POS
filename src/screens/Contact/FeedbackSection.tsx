import DynamicInput from '@/components/DynamicInput';
import SubmitButton from '@/components/SubmitButton';
import Bluebird from 'bluebird';
import React, {memo, useCallback, useState} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  margin: 24px;
  margin-bottom: 0px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
`;

const SDynamicInput = styled(DynamicInput)`
  margin-top: 12px;
`;

const SSubmitButton = styled(SubmitButton)`
  margin-top: 12px;
`;

const FeedbackSection = memo(function () {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const onSubmit = useCallback(async () => {
    global.showLoading();
    await Bluebird.delay(300);
    global.hideLoading();
    global.showMessage('Cảm ơn bạn đã gửi phản hồi đến chúng tôi!');
    setName('');
    setFeedback('');
  }, []);

  return (
    <Wrapper>
      <Title>Phản hồi chất lượng Dịch vụ / Sản phẩm</Title>
      <SDynamicInput
        label={'Tên của bạn'}
        onChangeText={setName}
        textInputProps={{value: name}}
        placeholderStr="Vui lòng nhập"
        inputTheme="dark"
      />
      <SDynamicInput
        label={'Nội dung phản hồi'}
        multiline
        textInputProps={{value: feedback}}
        onChangeText={setFeedback}
        placeholderStr="Vui lòng nhập"
        inputTheme="dark"
      />
      <SSubmitButton
        disabled={!name || !feedback}
        text="Gửi phản hồi"
        onPress={onSubmit}
      />
    </Wrapper>
  );
});

export default FeedbackSection;
