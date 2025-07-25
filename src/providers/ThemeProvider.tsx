"use client";
import { PropsWithChildren } from "react";
import { AppProgressBar } from "next-nprogress-bar";
import { App, ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import { configuration } from "@/theme/configs";

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <AntdRegistry>
      <ConfigProvider componentSize="middle" theme={configuration}>
        <App>{children}</App>
        <AppProgressBar color="#4a5df9" height="2px" shallowRouting />
      </ConfigProvider>
    </AntdRegistry>
  );
}
