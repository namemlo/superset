/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { t } from '@superset-ui/core';
import { SEPARATOR } from 'src/explore/components/controls/DateFilterControl/utils';
import { Input } from 'src/components/Input';
// import { InfoTooltipWithTrigger } from '@superset-ui/chart-controls';
import { FrameComponentProps } from 'src/explore/components/controls/DateFilterControl/types';
import DatePicker from 'antd/lib/date-picker';
import { Col, Row } from 'antd';
import { format } from 'date-fns';
// import DateFunctionTooltip from './DateFunctionTooltip';

function getAdvancedRange(value: string): string {
  if (value.includes(SEPARATOR)) {
    return value;
  }
  if (value.startsWith('Last')) {
    return [value, ''].join(SEPARATOR);
  }
  if (value.startsWith('Next')) {
    return ['', value].join(SEPARATOR);
  }
  return SEPARATOR;
}

export function AdvancedFrame(props: FrameComponentProps) {
  const advancedRange = getAdvancedRange(props.value || '');
  const [since, until] = advancedRange.split(SEPARATOR);

  let startDate = new Date();
  let endDate = new Date();

  if (advancedRange !== props.value) {
    props.onChange(getAdvancedRange(props.value || ''));
  }

  function onChange(control: 'since' | 'until', value: string) {
    if (control === 'since') {
      props.onChange(`${value}${SEPARATOR}${until}`);
    } else {
      props.onChange(`${since}${SEPARATOR}${value}`);
    }
  }

  return (
    <>
      {/* <div className="section-title">
        {t('Configure Time Range ')}
        <DateFunctionTooltip placement="rightBottom"> */}
      {/* TODO: Remove fa-icon
          eslint-disable-next-line icons/no-fa-icons-usage
          <i className="fa fa-info-circle text-muted" />
        </DateFunctionTooltip>
      </div> */}
      {/* <Input
        key="since"
        value={since}
        onChange={e => onChange('since', e.target.value)}
      />
      <div className="control-label">
        {t('END (EXCLUSIVE)')}{' '}
        <InfoTooltipWithTrigger
          tooltip={t('End date excluded from time range')}
          placement="right"
        />
      </div>
      <Input
        key="until"
        value={until}
        onChange={e => onChange('until', e.target.value)}
      /> */}
      <Row className="time-ranger">
        <Col className="time-section">
          <DatePicker
            placeholder={t('Start date')}
            onChange={e => {
              if (!e) {
                return;
              }
              const date = e!.toDate();
              date.setHours(0, 0, 0, 0);
              // endDate.setDate(startDate.getDate() + 1);
              const startDateDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
              // const endDateDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");
              onChange('since', startDateDate);
              startDate = e!.toDate();
              // onChange('since', startDateDate);
            }}
          />
        </Col>
        <Col className="time-section">
          <DatePicker
            placeholder={t('End date')}
            onChange={e => {
              if (!e) {
                return;
              }
              const date = e!.toDate();
              date.setHours(0, 0, 0, 0);
              date.setDate(date.getDate() + 1);
              // const startDateDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
              const endDateDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
              onChange('until', endDateDate);
              endDate = e!.toDate();
            }}
          />
        </Col>
      </Row>
    </>
  );
}

function formatLocalDate(date: Date) {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const year = date.getFullYear();
  // Note: getMonth() returns 0-indexed months so we add 1.
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
