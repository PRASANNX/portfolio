"use client";

import { CloudShader as CloudShaderBase } from "@/components/ui/cloud-shader";

export default function CloudShaderWrapper(props: React.ComponentProps<typeof CloudShaderBase>) {
  return <CloudShaderBase {...props} />;
}
