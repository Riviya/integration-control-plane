/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState } from 'react';
import { Box, IconButton } from '@wso2/oxygen-ui';
import { Check, Copy } from '@wso2/oxygen-ui-icons-react';

interface CodeBoxWithCopyProps {
  code: string;
}

const CodeBoxWithCopy: React.FC<CodeBoxWithCopyProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Box sx={{ position: 'relative', my: 1 }}>
      <Box
        component="pre"
        sx={{
          p: 2,
          bgcolor: 'action.hover',
          borderRadius: 1,
          overflow: 'auto',
          fontSize: 13,
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}>
        {code}
      </Box>
      <IconButton size="small" onClick={handleCopy} sx={{ position: 'absolute', top: 8, right: 8 }} aria-label="Copy">
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </IconButton>
    </Box>
  );
};

export default CodeBoxWithCopy;
