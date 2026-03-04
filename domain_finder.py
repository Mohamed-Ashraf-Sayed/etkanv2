#!/usr/bin/env python3
"""
Domain Finder for "اتقان" - focused on etqan / etqantech
"""

import socket
import subprocess

name_variants = [
    "etqan",
    "etqantech",
    "etqan-tech",
    "etqantec",
    "etqan-tec",
    "etqanit",
    "etqan-it",
    "etqandev",
    "etqan-dev",
    "etqanpro",
    "etqan-pro",
    "etqanai",
    "etqan-ai",
    "etqanapp",
    "etqan-app",
    "etqanhq",
    "etqan-hq",
    "etqanio",
    "etqanlab",
    "etqan-lab",
    "etqanlabs",
    "etqan-labs",
    "etqanx",
    "etqan-x",
    "etqanly",
    "etqanplus",
    "etqan-plus",
    "goetqan",
    "go-etqan",
    "getetqan",
    "get-etqan",
    "tryetqan",
    "myetqan",
    "weetqan",
    "etqan360",
    "etqanup",
    "etqan-up",
]

extensions = [
    ".com", ".net", ".org", ".io", ".co", ".app",
    ".dev", ".ai", ".me", ".tech", ".online", ".site",
    ".xyz", ".sa", ".ae", ".com.sa",
]

def check_domain_dns(domain):
    try:
        socket.setdefaulttimeout(2)
        socket.getaddrinfo(domain, 80)
        return True
    except socket.gaierror:
        return False
    except Exception:
        return False

def check_domain_whois(domain):
    try:
        result = subprocess.run(
            ["whois", domain],
            capture_output=True, text=True, timeout=5
        )
        output = result.stdout.lower()
        not_found = [
            "no match", "not found", "no entries found",
            "no data found", "status: free", "domain not found",
            "no whois information", "is available",
        ]
        for indicator in not_found:
            if indicator in output:
                return False
        if "domain name:" in output or "registrar:" in output or "creation date:" in output:
            return True
        return None
    except Exception:
        return None

def main():
    print("=" * 60)
    print("  Domain Finder - اتقان (etqan / etqantech)")
    print("=" * 60)

    available, taken, uncertain = [], [], []
    total = len(name_variants) * len(extensions)
    checked = 0

    for name in name_variants:
        for ext in extensions:
            domain = f"{name}{ext}"
            checked += 1
            print(f"\r  [{checked}/{total}] Checking: {domain:<35}", end="", flush=True)

            if check_domain_dns(domain):
                taken.append(domain)
            else:
                whois_result = check_domain_whois(domain)
                if whois_result is True:
                    taken.append(domain)
                elif whois_result is False:
                    available.append(domain)
                else:
                    uncertain.append(domain)

    print("\n")
    print("=" * 60)
    print(f"  Available ({len(available)}):")
    print("=" * 60)
    for d in available:
        print(f"    + {d}")

    if uncertain:
        print(f"\n  Probably Available ({len(uncertain)}):")
        print("-" * 40)
        for d in uncertain:
            print(f"    ? {d}")

    print(f"\n  Taken ({len(taken)}):")
    print("-" * 40)
    for d in taken:
        print(f"    x {d}")

    print(f"\n{'=' * 60}")
    print(f"  Total: {total} | Available: {len(available)} | Uncertain: {len(uncertain)} | Taken: {len(taken)}")
    print("=" * 60)

if __name__ == "__main__":
    main()
