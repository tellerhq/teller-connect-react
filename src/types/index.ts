import React from 'react';
import { TellerConnectManager } from '../manager';

export interface TellerInstitution {
  name: string;
}

export interface TellerUser {
  id: string;
}

export interface TellerEnrollment {
  id: string;
  institution: TellerInstitution;
}

export interface TellerConnectEnrollment {
  accessToken: string;
  user: TellerUser;
  enrollment: TellerEnrollment;
  signatures: Array<string> | null;
} 

export interface TellerConnectOnEventMetadata {
}

export type TellerConnectOnFailure = (failure: {
  type: "payment" | "payee" | string;
  code: "timeout" | "error" | string;
  message: string;
}) => void;

export type TellerConnectOnLoad = () => void;

export type TellerConnectOnExit = () => void;

export type TellerConnectOnSuccess = (
  authorization: TellerConnectEnrollment
) => void;

export type TellerConnectOnEvent = (
  name: string,
  data: object, 
) => void;

export interface TellerConnectOptions {
  onSuccess: TellerConnectOnSuccess;
  onLoad: null | TellerConnectOnLoad;
  onFailure: null | TellerConnectOnFailure;
  onEvent: null | TellerConnectOnEvent;
  onExit: null | TellerConnectOnExit;
  environment: "production" | "development" | "sandbox";
  applicationId: string;
  enrollmentId: null | string;
  institution: null | string;
  selectAccount: "disabled" | "single" | "multiple";
  connectToken: null | string;
  nonce: null | string;
  appearance: null | "dark" | "light" | "system";
  products: Array<"identity" | "verify" | "transactions">;
  accountFilter: null | object;
  [key: string]: any;
}

export interface TellerConnectInstance {
  open: () => void;
  destroy: () => void;
}

export interface TellerConnect extends TellerConnectManager {
  setup: (config: TellerConnectOptions) => TellerConnectInstance;
}

declare global {
  interface Window {
    TellerConnect: TellerConnect;
  }
}
