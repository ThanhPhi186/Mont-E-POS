import ScreenWithTitle from '@/components/ScreenWithTitle';
import { NormalText } from '@/components/TextCommon';
import { useNavigationParams } from '@/hooks/navigation';
import { getImageUrl } from '@/services/Fetch';
import { IFullProduct } from '@/store/product/type';
import { widthScreen } from '@/utils/Tranform';
import React, { memo, useContext } from 'react';
import styled from 'styled-components/native';
import { ProductContext } from '../ProductContext';

const Wrapper = styled.View`
  border-top-width: 1px;
  border-top-color: #f2f2f7;
  padding: 16px 0px;
  margin-top: 16px;
`;

const ListConfig = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Label = styled(NormalText)``;

const ItemWrapper = styled.TouchableOpacity<{ active: boolean }>`
  padding: 4px 8px;
  border: 1px solid #e5e5ea;
  border-radius: 4px;
  margin-top: 8px;
  margin-right: 8px;
  ${p =>
    p.active &&
    `
    border-color: #007AFF;
   background: rgba(0, 122, 255, 0.1);
 `}
`;

const ItemLabel = styled.Text``;

const ConfigSection = memo(() => {
  const {
    detail: { configs },
  } = useNavigationParams<{ detail: IFullProduct }>();

  const { selectedConfig, setSelectedConfig } = useContext(ProductContext);

  return (
    <Wrapper>
      <Label>Phân loại</Label>
      <ListConfig>
        {configs.map((config, index) => (
          <ItemWrapper
            active={config.quantityUomId === selectedConfig.quantityUomId}
            key={index.toString()}
            onPress={() => setSelectedConfig(config)}>
            <ItemLabel>{config.quantityUomDesc}</ItemLabel>
          </ItemWrapper>
        ))}
      </ListConfig>
    </Wrapper>
  );
});

export default ConfigSection;
