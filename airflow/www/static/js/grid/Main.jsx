/*!
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

/* global localStorage */

import React, { useState } from 'react';
import {
  Box,
  Flex,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';

import Details from './details';
import useSelection from './utils/useSelection';
import Grid from './Grid';
import FilterBar from './FilterBar';
import LegendRow from './LegendRow';

const detailsPanelKey = 'hideDetailsPanel';

const Main = () => {
  const isPanelOpen = localStorage.getItem(detailsPanelKey) !== 'true';
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: isPanelOpen });
  const { clearSelection } = useSelection();
  const [hoveredTaskState, setHoveredTaskState] = useState();

  const onPanelToggle = () => {
    if (!isOpen) {
      localStorage.setItem(detailsPanelKey, false);
    } else {
      clearSelection();
      localStorage.setItem(detailsPanelKey, true);
    }
    onToggle();
  };

  return (
    <Box>
      <FilterBar />
      <LegendRow setHoveredTaskState={setHoveredTaskState} />
      <Divider mb={5} borderBottomWidth={2} />
      <Flex justifyContent="space-between">
        <Grid
          isPanelOpen={isOpen}
          onPanelToggle={onPanelToggle}
          hoveredTaskState={hoveredTaskState}
        />
        <Box borderLeftWidth={isOpen ? 1 : 0} position="relative">
          {isOpen && (<Details />)}
        </Box>
      </Flex>
    </Box>
  );
};

export default Main;
