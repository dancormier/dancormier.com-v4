<script lang="ts">
  import { icon as faIcon } from '@fortawesome/fontawesome-svg-core';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { faFileLines, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

  const socials = [
    {
      type: 'github',
      label: "Visit Dan Cormier's GitHub",
      tooltip: 'github',
      url: 'https://github.com/dancormier',
      iconHtml: faIcon(faGithub).html[0],
    },
    {
      type: 'linkedin',
      label: "Visit Dan Cormier's LinkedIn",
      tooltip: 'linkedin',
      url: 'https://www.linkedin.com/in/dancormier',
      iconHtml: faIcon(faLinkedin).html[0],
    },
    {
      type: 'resume',
      label: "View Dan Cormier's resume",
      tooltip: 'resume',
      url: 'https://docs.google.com/document/d/1XcjhIYcCvxCqTJQaYUWsokPwOX4lrHoD9FEq519urXM/edit?usp=sharing',
      iconHtml: faIcon(faFileLines).html[0],
    },
    {
      type: 'email',
      label: 'Email Dan Cormier',
      tooltip: 'email',
      url: 'mailto:dancormierall@gmail.com',
      iconHtml: faIcon(faPaperPlane).html[0],
    },
  ] as const;
</script>

<div class="socials">
  {#each socials as social}
    <a
      aria-label={social.label}
      href={social.url}
      class="social-link"
      data-tooltip={social.tooltip}
      target={social.type !== 'email' ? '_blank' : undefined}
      rel={social.type !== 'email' ? 'noopener noreferrer' : undefined}
    >
      {@html social.iconHtml}
    </a>
  {/each}
</div>

<style>
  .socials {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    font-size: 2rem;
    gap: 0 2.5rem;
    margin-top: 0.5rem;
  }

  .social-link {
    color: var(--color-link);
    position: relative;
    transition: color 0.1s;
  }

  .social-link:hover,
  .social-link:focus {
    color: var(--color-highlight);
  }

  .social-link[data-tooltip]::after {
    background: var(--color-primary);
    border-radius: 4px;
    bottom: calc(100% + 6px);
    color: #fff;
    content: attr(data-tooltip);
    font-family: var(--font-body);
    font-size: 0.75rem;
    left: 50%;
    opacity: 0;
    padding: 2px 8px;
    pointer-events: none;
    position: absolute;
    transform: translateX(-50%);
    transition: opacity 0.1s;
    white-space: nowrap;
  }

  @media (hover: hover) {
    .social-link[data-tooltip]:hover::after {
      opacity: 1;
    }
  }
</style>
